import multer, { diskStorage } from "multer";
import fs from "node:fs"
import { badRequest } from "./Response/error.response.js";

export const fileUpload = ()=>{
    return multer({
        fileFilter : (req,file,cb)=>{
            if(!["image/png","image/jpeg","image.gif"].includes(file.mimetype)){
                cb(new badRequest("invalid file format"),false)

            }

            cb(null,true)

        },
        storage : diskStorage({
            destination : (req,file,cb)=>{
                if( !fs.existsSync(`uploads/${req.user._id}`))   fs.mkdirSync(`uploads/${req.user._id}`)
              
                cb(null,`uploads/${req.user._id}`)
            },
            filename  : (req,file,cb)=>{
                cb(null,Date.now() +Math.random() + "__" + file.originalname)
            } 
        })
    })
}