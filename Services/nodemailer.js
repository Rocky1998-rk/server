import nodemailer from "nodemailer";
import env from "dotenv";

env.config();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure:false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },

    tls: {
        rejectUnauthorized: false,
    },
});

   export const sendEmail = async (email, subject, content) => {
     try {

            await transporter.sendMail({
            from: process.env.MAIL_USER, // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            html: content, // html body

          });

          console.log("Email sent!");
          
     } catch (error) {
        console.log("error sending email:" + error.message);
     }
    
  };


  /////////////////////////



 
  