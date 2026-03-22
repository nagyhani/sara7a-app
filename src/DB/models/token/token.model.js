import { model, Schema, SchemaTypes } from "mongoose";

const schema = new Schema({

    userId : {type : SchemaTypes.ObjectId , ref : "User" ,required : true},
    token : String,
    expiresAt : {
        type : Date , index : { expires : 0}
    }

})

export const token = model("token" , schema)