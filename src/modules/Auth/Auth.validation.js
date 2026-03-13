import joi from "joi"

import { generalFields } from "../../middlewares/validation.middlewares.js"

export const signupSchema = joi.object({
  userName : generalFields.userName,
  email : generalFields.email ,
  password : generalFields.password,
  rePassword : generalFields.rePassword ,
  phoneNumber : generalFields.phoneNumber,
  gender: generalFields.gender,
  role : generalFields.role 
}).or("email" , "phoneNumber").messages({"object.missing" : "at least email or phoneNumber required"}).required()

export const loginSchema = joi.object({
  email: generalFields.email ,
  password : generalFields.password,
   phoneNumber : generalFields.phoneNumber
}).or("email" , "phoneNumber").messages({"object.missing" : "at least email or phoneNumber required"}).required()
