import jwt from "jsonwebtoken"

const signToken = (payload,secretKey,options = {})=>{

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


