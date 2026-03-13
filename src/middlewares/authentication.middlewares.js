import { notFound, verifyToken } from "../common/index.js"
import { getUser } from "../modules/user/user.service.js"

export const isAuthenticated = async (req,res,next)=>{

    const {authorization} = req.headers
    
      const payLoad = verifyToken(authorization,"kljfpiofieqihrriohepoighoiwvhtuwihuvsvsvsdvsgdrghfsfdshyyhetn",)

      const user = await getUser({_id : payLoad.sub})

      if(!user) throw new notFound("user not found")

        req.user = user

        next()
    
}