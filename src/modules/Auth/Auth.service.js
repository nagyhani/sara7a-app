import { userRepository } from "../../DB/index.js"


export const signUp = async (item)=>{
  return await userRepository.create(item)
}

