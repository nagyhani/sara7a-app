import { Router } from "express";
import { checkUserExist } from "../user/user.service.js";
import { compare, conflict, decryption, encryption, generateOTP, generateTokes, hash, notFound, sendEmail, successResponse, SYS_ROLE, verifyToken } from "../../common/index.js";
import { signUp } from "./Auth.service.js";
import { User } from "../../DB/models/user/user.model.js";



const router = Router()

router.post("/signUp" , async (req,res,next)=>{
  const {email,phoneNumber} = req.body

 const userExist = await checkUserExist({
  $or:[
    { email:{$eq:email,$exists:true,$ne:null}},
    { phoneNumber:{$eq:phoneNumber,$exists:true,$ne:null}}
  ]
 })

 if(userExist) throw new conflict("User already exists")

 req.body.role = SYS_ROLE.user
 req.body.password = await hash(req.body.password,10)

 if(phoneNumber){
   req.body.phoneNumber = encryption(phoneNumber)
 }

 const otp = generateOTP()

 req.body.otp = {
   code: otp,
   expiresIn: Date.now() + 10*60*1000
 }

 const user = await signUp(req.body)

 await sendEmail({
   to: email,
   subject: "Verify your account",
   html: `<h2>Your OTP is: ${otp}</h2>`
 })

 return successResponse({
   res,
   status:201,
   message:"OTP sent to email. Please verify your account",
   data:{user}
 })

})

router.post("/login", async (req,res,next)=>{

 let {email , password , phoneNumber} = req.body
 let user

 if(email){
   user = await checkUserExist({email})
 }

 if(!user && phoneNumber){

   const users = await User.find({ phoneNumber: { $exists: true } })
   user = users.find(u=>{
      try{
        
         if(!u.phoneNumber) return false
         return decryption(u.phoneNumber) === phoneNumber
      }catch{
         return false
      }
   })
 }

 if(!user) throw new notFound("invalid credentials")

 const match = await compare(password,user.password)

 if(!match) throw new notFound("invalid email or password")

 user.password = undefined

 if(user.phoneNumber){
   user.phoneNumber = decryption(user.phoneNumber)
 }

 const {accessToken,refreshToken} = generateTokes({sub:user._id, role:user.role})

 return successResponse({
   res,
   message:"user logged successfully",
   data:{accessToken,refreshToken}
 })

})

router.get("/refresh-token" ,(req,res,next)=>{
  const {authorization} = req.headers

  const payLoad = verifyToken(authorization,"kljfpiofieqihrriohepoighoiwvhtuwihuvsvsvsdvsgdrghfsfdshyyhetn",)

  delete payLoad.iat
  delete payLoad.exp

  const {accessToken,refreshToken} = generateTokes(payLoad)

  return successResponse({
   res,
   message:"done",
   data:{accessToken,refreshToken}
 })
})


router.post("/verifyEmail", async (req,res,next)=>{

 const {email,otp} = req.body

 const user = await User.findOne({email})

 if(!user) throw new notFound("user not found")

 if(user.isVerified) throw new conflict("user already verified")

 if(user.otp.code !== otp){
   throw new conflict("invalid otp")
 }

 if(Date.now() > user.otp.expiresIn){
   throw new conflict("otp expired")
 }

 user.isVerified = true
 user.otp = undefined

 await user.save()

 successResponse({
   res,
   message:"email verified successfully"
 })

})
export default router