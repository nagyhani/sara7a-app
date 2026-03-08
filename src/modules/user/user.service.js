import { userRepository } from "../../DB/index.js"


export const checkUserExist = async (filter)=>{

  return await userRepository.getOne(filter)
} 