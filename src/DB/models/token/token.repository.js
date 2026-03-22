import { dbRepository } from "../../DB.repository.js";
import { token } from "./token.model.js";

class TokenRepository extends dbRepository{

    constructor(){
        super(token)
    }
}

export const tokenRepository = new TokenRepository()