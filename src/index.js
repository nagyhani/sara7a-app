import express from 'express'
import { connectDB } from './DB/connection.js'
import { AuthRouter, messageRouter, userRouter } from './modules/index.js'
import { errorGlobalHandler } from './common/index.js'
import dotenv from "dotenv"
dotenv.config()

const app = express()
const port = 3000


connectDB()
app.use("/uploads" ,express.static("uploads"))
app.use(express.json())

app.use("/Auth" , AuthRouter)

app.use("/user" , userRouter)

app.use("/message" , messageRouter)

app.use(errorGlobalHandler)

app.listen(port,()=>{
    console.log("Application connected successfully to port", port);
    
})