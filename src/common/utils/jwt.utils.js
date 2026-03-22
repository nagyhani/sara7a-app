import jwt from "jsonwebtoken"
import crypto from "node:crypto"
const signToken = (payload,secretKey,options = {})=>{

    payload.jti = crypto.randomBytes(10).toString("hex")

    return jwt.sign(payload,secretKey,options)
}

export const verifyToken = (token,secretKey,options = {})=>{

    return jwt.verify(token,secretKey,options)
}


export const generateTokes = (payload)=>{

    const accessToken = signToken(payload,"kljfpiofieqihrriohepoighoiwvhtuwihuvsvsvsdvsgdrghfsfdshyyhetn",{expiresIn : "1h"})

    const refreshToken = signToken(payload,"klashweiufyiewoyf6465f4wefjuwegfiugwfguiowegf" ,{expiresIn:"1y"})

    return {accessToken,refreshToken}
}


