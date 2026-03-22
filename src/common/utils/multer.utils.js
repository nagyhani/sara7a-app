import multer, { diskStorage } from "multer";
import fs from "node:fs"
import { badRequest } from "./Response/error.response.js";

export const profilePicUpload = ()=>{
    return multer({
        fileFilter : (req,file,cb)=>{
            if(!["image/png","image/jpeg","image.gif"].includes(file.mimetype)){
                cb(new badRequest("invalid file format"),false)

            }

            cb(null,true)

        },
        storage : diskStorage({
            destination : (req,file,cb)=>{
                const path = `uploads/user/profilePic/${req.user._id}`
                if(!fs.existsSync(path))fs.mkdirSync(path , { recursive: true })
              
                cb(null,path)
            },
            filename  : (req,file,cb)=>{
                cb(null,Date.now() +Math.random() + "__" + file.originalname)
            } 
        })
    })
}


export const coverPicUpload = ()=>{
    return multer({
        fileFilter : (req,file,cb)=>{
            if(!["image/png","image/jpeg","image.gif"].includes(file.mimetype)){
                cb(new badRequest("invalid file format"),false)

            }

            cb(null,true)

        },
        storage : diskStorage({
            destination : (req,file,cb)=>{
                const path = `uploads/user/coverPic/${req.user._id}`
                if(!fs.existsSync(path))fs.mkdirSync(path , { recursive: true })
              
                cb(null,path)
            },
            filename  : (req,file,cb)=>{
                cb(null,Date.now() +Math.random() + "__" + file.originalname)
            } 
        })
    })
}