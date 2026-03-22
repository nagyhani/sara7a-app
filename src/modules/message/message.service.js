import { notFound } from "../../common/index.js"
import { messageRepository } from "../../DB/index.js"

export const createMessage = async (body)=>{

  return await messageRepository.create(body)
}

export const getAllMessages = async (filter)=>{
  return await messageRepository.getAll(filter)
}

export const getOneMessage = async(filter)=>{
   return await messageRepository.getOne(filter)
}


export const updateMessage = async(filter,body)=>{
  const messageExist = await getOneMessage(filter)

  if(!messageExist) throw new notFound("message not found")
  return await messageRepository.updateOne(filter,body,{new:true})
}


export const deleteOneMessage = async (filter)=>{

 await messageRepository.deleteOne(filter)
}

export const deleteAllMessages = async (filter)=>{

  await messageRepository.deleteAll(filter)
}