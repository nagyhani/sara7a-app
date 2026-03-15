import { Router } from "express"
import { fileValidation, isAuthenticated } from "../../middlewares/index.js"
import { decryption, fileUpload, successResponse } from "../../common/index.js"
import { uploadProfilePic } from "./user.service.js"

const router = Router()

router.get("/" ,isAuthenticated ,  (req,res,next)=>{

    const {user} = req

    if(user.phoneNumber){
        user.phoneNumber = decryption(user.phoneNumber)
    }

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


export default router