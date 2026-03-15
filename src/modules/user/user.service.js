import { notFound } from "../../common/index.js";
import { userRepository } from "../../DB/index.js"
import  fs  from 'node:fs';



export const checkUserExist = async (filter)=>{

  return await userRepository.getOne(filter)
} 

export const getUser = async (filter)=>{
  return await userRepository.getOne(filter)
}

export const uploadProfilePic = async (user,file)=>{

 const updatedUser =  await userRepository.updateOne({_id:user._id},{profilePic:file.path})

 if(!updatedUser) throw new notFound("user not found")

  fs.unlinkSync(user.profilePic)
  return updatedUser

}