import { model, Schema, SchemaTypes } from "mongoose";


const schema = Schema({
    title : {type: String , required : true , trim : true , minLength : 2 },
    description : {type: String , required : true , trim : true , minLength : 2 },
    userId : {type : SchemaTypes.ObjectId , ref : "User" ,required : true}
},{})

export const Messages = model("Messages" , schema) 