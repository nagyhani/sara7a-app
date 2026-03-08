import mongoose from "mongoose"

export function connectDB(){

    mongoose.connect('mongodb://127.0.0.1:27017/sara7aApp').then(()=>{
        console.log("DB connected successfully");
        
    }).catch(()=>{
         console.log("DB connection failed");
    })
}