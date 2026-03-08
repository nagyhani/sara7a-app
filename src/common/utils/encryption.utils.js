import NodeRSA from "node-rsa"
import fs from "fs"

const key = new NodeRSA({ b: 2048 })

const publicKey = fs.readFileSync("public.pem", "utf8")
const privateKey = fs.readFileSync("private.pem", "utf8")

export const encryption = (phoneNumber)=>{

    const publicKeyInstance = new NodeRSA(publicKey)
    return publicKeyInstance.encrypt(phoneNumber, "base64")
}

export const decryption = (encryptedNumber) => {

   if(!encryptedNumber){
      return null
   }

   const privateKeyInstance = new NodeRSA(privateKey)

   return privateKeyInstance.decrypt(encryptedNumber, "utf8")
}