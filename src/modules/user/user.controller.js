import { Router } from "express"
import { isAuthenticated } from "../../middlewares/index.js"
import { decryption, successResponse } from "../../common/index.js"

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


export default router