import { Router } from "express";
import {  generateTokes, successResponse, verifyToken } from "../../common/index.js";
import { login, logout, logOutFromAllDevices, sendOTP, signUp, verifyAccount } from "./Auth.service.js";
import { loginSchema, signupSchema } from "./Auth.validation.js";
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


router.patch("/verify-account" , async (req,res,next)=>{

  await verifyAccount(req.body)

  return successResponse({
   res,
   message:"Account verified successfully",
   
 })
})

router.post("/send-otp" ,async (req,res,next)=>{

  await sendOTP(req.body)

   return successResponse({
   res,
   message:"OTP sent successfully",
   
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