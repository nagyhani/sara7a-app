import { Router } from "express";
import { isAuthenticated } from "../../middlewares/authentication.middlewares.js";
import { createMessage, deleteAllMessages, deleteOneMessage, getAllMessages, getOneMessage, updateMessage } from "./message.service.js";
import { badRequest, notFound, successResponse } from "../../common/index.js";
import { isValid } from "../../middlewares/validation.middlewares.js";
import { createMessageSchema, updateMessageSchema } from "./message.validation.js";

const router = Router()


router.post("/" , isAuthenticated,isValid(createMessageSchema) , async (req,res,next)=>{
    const {_id} = req.user
    req.body.userId = _id
  const message =  await createMessage(req.body)
  return  successResponse({res,status:201,message:"done" , data : {message}})
})

router.get("/" , isAuthenticated, async (req,res,next)=>{
    let {_id} = req.user
  const messages =  await getAllMessages({userId : _id})
  return  successResponse({res,message:"done" , data : {messages}})
})

router.delete("/", isAuthenticated, async (req, res, next) => {
  const { _id } = req.user;

  const result = await deleteAllMessages({ userId: _id });

  if (result?.deletedCount === 0) {
    throw new notFound("no messages found");
  }

  return successResponse({ res, message: "done" });
});

router.patch("/:id" , isAuthenticated,isValid(updateMessageSchema), async (req,res,next)=>{

  const {id}= req.params
 const updatedMessage =  await updateMessage({_id:id},req.body)

 if(req.body.userId) throw new badRequest("can't update user ID")

   return  successResponse({res,message:"message updated successfully " , data : {updatedMessage}})
})


router.get("/:id",isAuthenticated,async (req,res,next)=>{
     let {_id} = req.user
    let {id} = req.params
  const message =  await getOneMessage({_id : id,userId:_id})
   if(!message) throw new notFound("no message found")
   return  successResponse({res,message:"done" , data : {message}})

})

router.delete("/:id",isAuthenticated,async (req,res,next)=>{
   let {id} = req.params
    let {_id} = req.user

  const message =  await deleteOneMessage({_id : id ,userId:_id })

  if(!message) throw new notFound("no message found")

   return  successResponse({res,message:"done" })
})

export default router