import bcrypt from "bcryptjs"

export const hash = async (password)=>{

    return await bcrypt.hash(password,12)
}

export const compare = async (password, hashedPassword)=>{
    return await bcrypt.compare(password, hashedPassword)
}