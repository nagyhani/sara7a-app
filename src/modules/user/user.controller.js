import { Router } from "express"
import { fileValidation, isAuthenticated } from "../../middlewares/index.js"
import { fileUpload, successResponse } from "../../common/index.js"
import { deleteProfilePic, deleteUser, getUser, uploadProfilePic } from "./user.service.js"


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

router.patch("/upload-profile-picture" ,isAuthenticated,fileUpload().single("image"),fileValidation, async(req,res,next)=>{

 const updatedUser = await uploadProfilePic(req.user,req.file)

  return successResponse({
       res,
       message:"profile picture uploaded",
       data: {updatedUser}
     })
})

router.patch("/delete-profile-picture" ,isAuthenticated, async(req,res,next)=>{

 const updatedUser = await deleteProfilePic(req.user,req.file)

  return successResponse({
       res,
       message:"profile picture delete",
       data: {updatedUser}
     })
})





export default router