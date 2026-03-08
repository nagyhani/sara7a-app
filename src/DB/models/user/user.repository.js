import { dbRepository } from "../../DB.repository.js";
import { User } from "./user.model.js";

class UserRepository extends dbRepository{

    constructor(){
        super(User)
    }
}

export const userRepository = new UserRepository()