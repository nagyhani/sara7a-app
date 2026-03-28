import { Router } from "express"
import { fileValidation, isAuthenticated } from "../../middlewares/index.js"
import { badRequest, coverPicUpload, profilePicUpload, successResponse } from "../../common/index.js"
import { deleteProfilePic, deleteUser, getUser, uploadCoverPic, uploadProfilePic } from "./user.service.js"



const router = Router()

router.get("/" ,isAuthenticated , async (req,res,next)=>{

 const user =  await getUser(req.user)

 user.numberOfVisits = undefined

     return successResponse({
       res,
       message:"done",
       data:{user}
     })

})

router.delete("/",isAuthenticated,async (req,res,next)=>{

 const user = await deleteUser(req.user)

 return successResponse({
       res,
       message:"done",
       data:{user}
     })


})

router.patch("/upload-cover-picture" , isAuthenticated,coverPicUpload().single("image"),fileValidation , async (req,res,next)=>{

     console.log(req.file);
     
     const updatedUser = await uploadCoverPic(req.user,req.file)

  return successResponse({
       res,
       message:"cover picture uploaded",
       data: {updatedUser}
     })

})

router.patch("/upload-profile-picture" ,isAuthenticated,profilePicUpload().single("image"),fileValidation, async(req,res,next)=>{
 const updatedUser = await uploadProfilePic(req.user,req.file)

  return successResponse({
       res,
       message:"profile picture uploaded",
       data: {updatedUser}
     })
})

router.patch("/delete-profile-picture" ,isAuthenticated, async(req,res,next)=>{

 const updatedUser = await deleteProfilePic(req.user,req.file)

  if(!updatedUser.profilePic) throw new badRequest("No profile picture found")

  return successResponse({
       res,
       message:"profile picture deleted",
     })
})





export default router