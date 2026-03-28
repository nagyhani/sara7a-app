import { Router } from "express";
import {  generateTokes, successResponse, verifyToken } from "../../common/index.js";
import { forgotPassword, forgotPasswordOTP, login, logout, logOutFromAllDevices, resetPassword, sendOTP, signUp, twoStepSendOTP, twoStepVerification, updatePassword, verifyAccount } from "./Auth.service.js";
import { loginSchema, signupSchema, updatePasswordSchema } from "./Auth.validation.js";
import { isValid } from "../../middlewares/validation.middlewares.js";
import { isAuthenticated } from "../../middlewares/index.js";



const router = Router()

router.post("/signUp" ,isValid(signupSchema), async (req,res,next)=>{
  const user = await signUp(req.body)
  
 return successResponse({
   res,
   status:201,
   message:"signed successfully",
   data:{user}
 })

})

router.post("/login",isValid(loginSchema), async (req,res,next)=>{

  const {accessToken,refreshToken} = await login(req.body)

 return successResponse({
   res,
   message:"user logged successfully",
   data:{accessToken,refreshToken}
 })

})


router.patch("/update-password" ,isAuthenticated ,isValid(updatePasswordSchema), async (req,res,next)=>{

     const updatedUser = await updatePassword(req.body , req.user)

       return successResponse({
       res,
       message:"done",
       data:{updatedUser}
     })

})

router.get("/refresh-token" ,(req,res,next)=>{
  const {authorization} = req.headers

  const payLoad = verifyToken(authorization,"klashweiufyiewoyf6465f4wefjuwegfiugwfguiowegf",)

  delete payLoad.iat
  delete payLoad.exp

  const {accessToken,refreshToken} = generateTokes(payLoad)

  return successResponse({
   res,
   message:"done",
   data:{accessToken,refreshToken}
 })
})

router.post("/forgot-password-OTP",isAuthenticated, async (req,res,next)=>{

  await forgotPasswordOTP(req.body)

   return  successResponse({
   res,
   message:"OTP sent successfully to your email",
 })

})

router.patch("/forgot-password" ,isAuthenticated , async (req,res,next)=>{
   await forgotPassword(req.body,req.user)

   return successResponse({
   res,
   message:"done",
 })
})

router.patch("/reset-password" , isAuthenticated , isValid(updatePasswordSchema) , async (req,res,next)=>{

 await resetPassword(req.body,req.user)

 
   return successResponse({
   res,
   message:"password updated successfully",
 })


})


router.patch("/verify-account" , async (req,res,next)=>{

  await verifyAccount(req.body)

  return successResponse({
   res,
   message:"Account verified successfully",
 })
})

router.patch("/2-step-verification-OTP" , async (req,res,next)=>{
 await twoStepSendOTP(req.body)

    return  successResponse({
   res,
   message:"OTP sent successfully to your email",
 })
})


router.patch("/2-step-verification" , async (req,res,next)=>{

  await twoStepVerification(req.body)

  return successResponse({
   res,
   message:"2-step-verification activated successfully",
 })
})

router.patch("/verify-account" , async (req,res,next)=>{

  await verifyAccount(req.body)

  return successResponse({
   res,
   message:"Account verified successfully",
   
 })
})


router.post("/send-otp" ,async (req,res,next)=>{

  await sendOTP(req.body)

   return  successResponse({
   res,
   message:"OTP sent successfully to your email",
 })
  
})

router.patch("/log-out-from-all-devices",isAuthenticated ,async (req,res,next)=>{
  await logOutFromAllDevices(req.user)

  return  successResponse({
   res,
   message:"Logged from all devices",
   
 })
})

router.post("/log-out",isAuthenticated ,async (req,res,next)=>{
  await logout(req.payLoad,req.user)

  return  successResponse({
   res,
   message:"Logged successfully",
   
 })
})

export default router