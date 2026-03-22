import { badRequest, compare, conflict, decryption, encryption, generateTokes, hash, notFound, sendEmail, SYS_ROLE } from "../../common/index.js"
import { otpRepository, tokenRepository, userRepository } from "../../DB/index.js"
import { User } from "../../DB/models/user/user.model.js"
import { checkUserExist } from "../user/user.service.js"



export const signUp = async (body)=>{

  const { email, phoneNumber } = body

let encryptedPhone = null
if (phoneNumber) {
  encryptedPhone = encryption(phoneNumber)
}
if (email) {
  const emailExist = await checkUserExist({ email })
  if (emailExist) throw new conflict("User already exists")
}

if (phoneNumber) {
  const usersWithPhones = await userRepository.getAll({
    phoneNumber: { $exists: true, $ne: null }
  })

  for (const user of usersWithPhones) {
    const decryptedPhone = decryption(user.phoneNumber)

    if (decryptedPhone === phoneNumber) {
      throw new conflict("User already exists")
    }
  }
}
   body.role = SYS_ROLE.user
   body.password = await hash(body.password,10)
  
   if(phoneNumber){
     body.phoneNumber = encryptedPhone
   }

   if (email) await sendOTP({email})
   
  return await userRepository.create(body)
}


export const login = async (body)=>{
 
  const { email, password, phoneNumber } = body

  let user = null

  if (email) {
    user = await checkUserExist({ email })

    if (user && !user.isVerified) {
      throw new badRequest("verify account first")
    }
  }
  
 
  if (!user && phoneNumber) {
    const users = await userRepository.getAll({
      phoneNumber: { $exists: true, $ne: null }
    })

    user = users.find(u => {
      try {
        return u.phoneNumber && decryption(u.phoneNumber) === phoneNumber
      } catch {
        return false
      }
    })
  }


  if (!user) throw new notFound("invalid credentials")

  
  const match = await compare(password, user.password)
  if (!match) throw new notFound("invalid credentials")

 
  user.password = undefined

  if (user.phoneNumber) {
    try {
      user.phoneNumber = decryption(user.phoneNumber)
    } catch {
      user.phoneNumber = null
    }
  }

  
  const { accessToken, refreshToken } = generateTokes({
    sub: user._id,
    role: user.role
  })

  return { accessToken, refreshToken }
}



export const verifyAccount = async (body)=>{
  const {email,OTP} = body

 const otpDocument = await otpRepository.getOne({email})

 if(!otpDocument) throw new badRequest("expired OTP!")

  if(OTP != otpDocument.OTP) {

    otpDocument.attempts += 1

     if(otpDocument.attempts > 3) {

     await otpRepository.deleteOne({_id : otpDocument._id})
    
    throw new badRequest("too many tries")
   }
   await otpDocument.save() 

  
    throw new badRequest("invalid OTP!")
  }

    

    await userRepository.updateOne({email},{isVerified:true})

    await otpRepository.deleteOne({_id : otpDocument._id})

    return true
}

export async function sendOTP(body){

  const {email} = body

 const otpDocument =  await otpRepository.getOne({email})

 if(otpDocument) throw new badRequest("can't send otp, your otp still valid")

  const verifiedUser = await userRepository.getOne({email,isVerified : true})

  if(verifiedUser) throw new badRequest("user already verified")

  const OTP =  Math.floor(100000 +Math.random() * 900000)

   await otpRepository.create({OTP,email, expiresAt : Date.now() + 5 *60 * 1000})

   await sendEmail({to : email , subject : "verify your account" , html: `OTP to verify your account is ${OTP}`})
  

}


export const logOutFromAllDevices = async (user)=>{

  await userRepository.updateOne({_id : user._id},{credentialsUpdatedAt : Date.now()})

  return true

}

export const logout = async (tokenPayload,user)=>{
  await tokenRepository.create({
    token : tokenPayload.jti,
    userId : user._id,
    expiresAt : tokenPayload.exp
  })
}

