import { dbRepository } from "../../DB.repository.js";
import { Messages } from "./messages.model.js";

class MessageRepository extends dbRepository{

    constructor(){
        super(Messages)
    }
}

export const messageRepository = new MessageRepository()