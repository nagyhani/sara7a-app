import { Schema,model } from "mongoose";
import { SYS_GENDER, SYS_ROLE } from "../../../common/index.js";

const schema = new Schema({
    userName : {type: String , required : true , trim : true , minLength : 2 ,maxLength : 50},
    email : {type:String ,  required : function(){
        if(this.phoneNumber) return false
        return true
    } , unique : true , trim : true , lowercase : true ,sparse: true,},
    password : { type: String ,required : true , trim : true },
    phoneNumber : {type: String , trim : true , required : function(){
        if(this.email) return false
        return true
    }},
    gender : {type : Number , enum : Object.values(SYS_GENDER) , default: SYS_GENDER.male },
     role : {type : Number , enum : Object.values(SYS_ROLE) , default: SYS_ROLE.user },
     profilePic : String,
     isVerified : {type : Boolean , default: false},
     credentialsUpdatedAt : {type : Date , default : Date.now()},
     numberOfVisits : {type: Number , default: 0}
},{})

export const User = model("User" , schema)