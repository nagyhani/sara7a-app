import { Router } from "express";
import { checkUserExist } from "../user/user.service.js";
import { badRequest, compare, conflict, decryption, encryption, generateTokes, hash, notFound, successResponse, SYS_GENDER, SYS_ROLE, verifyToken } from "../../common/index.js";
import { signUp } from "./Auth.service.js";
import { User } from "../../DB/models/user/user.model.js";
import { loginSchema, signupSchema } from "./Auth.validation.js";
import { isValid } from "../../middlewares/validation.middlewares.js";



const router = Router()

router.post("/signUp" ,isValid(signupSchema), async (req,res,next)=>{
  const {email,phoneNumber} = req.body

 let encryptedPhone = null

  if (phoneNumber) {
    encryptedPhone = encryption(phoneNumber)
  }

  const userExist = await checkUserExist({
    $or: [
      { email },
      { phoneNumber: encryptedPhone }
    ]
  })

 if(userExist) throw new conflict("User already exists")

 req.body.role = SYS_ROLE.user
 req.body.password = await hash(req.body.password,10)

 if(phoneNumber){
   req.body.phoneNumber = encryptedPhone
 }

 const user = await signUp(req.body)

 return successResponse({
   res,
   status:201,
   message:"signed successfully",
   data:{user}
 })

})

router.post("/login",isValid(loginSchema), async (req,res,next)=>{

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
export default router