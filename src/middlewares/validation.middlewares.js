import { badRequest, SYS_GENDER, SYS_ROLE } from "../common/index.js"
import joi from "joi"


export const isValid = (schema)=>{
    return (req,res,next)=>{
         const validationResult = schema.validate(req.body,{abortEarly : false})
  if(validationResult.error){
    let errorMessage = validationResult.error.details.map((error)=>{
      return {message :error.message , path: error.path[0]} 
    }) 

    throw new badRequest("invalid validation" , errorMessage)
  }

  next()

    }
   
 }



 export const generalFields = {
    userName : joi.string().min(2).max(20).required().trim().pattern(/^(?!\d+$)[a-zA-Z][a-zA-Z0-9]*$/).messages({"string.min" : "length of userName must be at least 2 characters long","string.base" : "userName must be string","string.pattern.base" : "name can't start with numbers or be only numbers"}), 
    email : joi.string().trim().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).messages({"string.pattern.base" : "invalid email pattern EX : johndoe123@gmail.com"}),
    phoneNumber : joi.string().trim().pattern(/^(?:\+20|0)?1[0125][0-9]{8}$/).messages({"string.pattern.base" : "number invalid"}),
    password :  joi.string().trim().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).messages({"string.pattern.base" : "password must be At least 8 characters long ,Contains at least one uppercase letter,Contains at least one lowercase letter,Contains at least one digit,Contains at least one special character (e.g., @$!%*?&)"}).required(),
    rePassword : joi.string().valid(joi.ref("password")).messages({"any.only" : "rePassword must match password"}),
    gender : joi.number().valid(...Object.values(SYS_GENDER)).default(SYS_GENDER.male),
    role : joi.number().valid(...Object.values(SYS_ROLE)).default(SYS_ROLE.user),
    title : joi.string().min(2).trim().pattern(/^.{2,}$/).messages({"string.min" : "length of title must be at least 2 characters long"}), 
    description : joi.string().min(2).trim().pattern(/^.{2,}$/).messages({"string.min" : "length of description must be at least 2 characters long"}),
    twoStepVerify : joi.boolean()
 }