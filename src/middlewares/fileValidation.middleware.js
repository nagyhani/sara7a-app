import { fileTypeFromBuffer } from "file-type";
import fs from "node:fs";
import { badRequest } from "../common/index.js";


export const fileValidation = async (req, res, next) => {
    if(!req.file) throw new badRequest("No files uploaded");
    const filePath = req.file.path;
  
    const buffer = fs.readFileSync(filePath);
   
    const type = await fileTypeFromBuffer(buffer);
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!type || !allowedTypes.includes(type.mime)){

        fs.unlinkSync(filePath)
          return next(new badRequest("Invalid file type"));
    }
    

    return next();
 
};