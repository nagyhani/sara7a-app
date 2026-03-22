import { model, Schema } from "mongoose";

const schema  = new Schema({

    email : { type : String , required : true},
    OTP : {type : String , required : true},
    expiresAt : {type : Date ,index : {expires : 0}},
    attempts : {type : Number, default : 0}

},{})

export const otp = model("OTP" , schema)