import { badRequest, notFound, verifyToken } from "../common/index.js"
import { userRepository } from "../DB/index.js"
import { tokenRepository } from "../DB/models/token/token.repository.js"


export const isAuthenticated = async (req,res,next)=>{

    const {authorization} = req.headers
    
      const payLoad = verifyToken(authorization,"kljfpiofieqihrriohepoighoiwvhtuwihuvsvsvsdvsgdrghfsfdshyyhetn",)

      const user = await userRepository.getOne({_id : payLoad.sub})

      if(!user) throw new notFound("user not found")

        if(new Date(user.credentialsUpdatedAt).getTime() > payLoad.iat * 1000){
          throw new badRequest("invalid token")
        }


       const tokenExist = await tokenRepository.getOne({token : payLoad.jti})

       if(tokenExist) throw new badRequest("invalid Token!")


        req.user = user
        req.payLoad = payLoad

        next()
    
}