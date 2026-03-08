import nodemailer from "nodemailer"

export const sendEmail = async ({to, subject, html}) => {

 const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 587,        // TLS
   secure: false,    // false for TLS
   auth: {
     user: process.env.EMAIL,
     pass: process.env.EMAIL_PASS
   },
   tls: {
     rejectUnauthorized: false   // only for development
   }
 })

 await transporter.sendMail({
   from: `"Sara7a" <${process.env.EMAIL}>`,
   to,
   subject,
   html
 })

}