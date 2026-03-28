import { badRequest, compare, decryption, notFound } from "../../common/index.js";
import { userRepository } from "../../DB/index.js"
import  fs  from 'node:fs';




export const checkUserExist = async (filter)=>{

  return await userRepository.getOne(filter)
} 

export const getUser = async (user)=>{ 
      if(user.phoneNumber){
          user.phoneNumber = decryption(user.phoneNumber)
      }

 const userExist = await userRepository.getOne({_id:user._id})

 userExist.numberOfVisits += 1
 await userExist.save()
  return userExist
}



export const uploadProfilePic = async (user,file)=>{
 const updatedUser =  await userRepository.updateOne({_id:user._id},{profilePic:file.path},{new:true})

 if(!updatedUser) throw new notFound("user not found")

  if(user.profilePic) fs.unlinkSync(user.profilePic)

  return updatedUser
}


export const uploadCoverPic = async (user, file) => {
  
  const existingImages = user.coverPic || [];
  if (existingImages.length >= 2) {
    fs.unlinkSync(file.path); 
    throw new badRequest("You already have 2 cover images");
  }
  const updatedImages = [...existingImages, file.path];

  const updatedUser = await userRepository.updateOne(
    { _id: user._id },
    { coverPic: updatedImages },
    { new: true }
  );

  return updatedUser;
};

export const deleteProfilePic = async (user)=>{

  const updatedUser =  await userRepository.updateOne({_id:user._id},{profilePic:null})

  if(!updatedUser) throw new notFound("user not found")

  if(user.profilePic) fs.unlinkSync(user.profilePic)

  
  return updatedUser

}

export const deleteUser = async (user)=>{

  if(user.profilePic) fs.unlinkSync(user.profilePic)

 const deletedUser =  await userRepository.deleteOne({_id:user._id})

 if (!deletedUser) throw new notFound("user not found")

 return deletedUser

}