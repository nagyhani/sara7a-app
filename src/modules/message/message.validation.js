import  joi  from 'joi';
import { generalFields } from '../../middlewares/validation.middlewares.js';




export const createMessageSchema = joi.object({

    title : generalFields.title,
    description : generalFields.description
 
}).required()


export const updateMessageSchema = joi.object({

    title : generalFields.title,
    description : generalFields.description
 
}).or("title" , "description").messages({"object.missing" : "at least title or description required"}).required()