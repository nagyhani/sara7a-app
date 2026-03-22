import nodeMailer from "nodemailer"

export const sendEmail = async({to , subject , html} = {})=>{

   const transporter =  nodeMailer.createTransport({
    service : "gmail",
    host : "smtp.gmail.com",
    port : 587,
    secure : false,
    auth : {
        user: "nagyhani337@gmail.com" , 
        pass : "uqal ugbi tmcf jrul"
    },

      tls: {
    rejectUnauthorized: false
  }
   })


  await transporter.sendMail({
    from : "'sara7a App' <nagyhani337@gmail.com>",
    to,
    html,
    subject
   })
}