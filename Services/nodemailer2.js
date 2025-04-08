import nodemailer from "nodemailer"
import env from "dotenv"

env.config();

const createOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
};

  const importTransporter = nodemailer.createTransport({
      

    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT ,
    secure: false, 
    auth: {
      user:process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
      
    tls:{
        rejectUnauthorized:false,
    }

  });


  export const emailSend = async () => {
    const otp = createOTP();
    try {

        await importTransporter.sendMail({
            from:"<rkrockey9690@gmail.com>",
            to:"rkrockey9690@gmail.com",
            subject:"Your OTP Code",
            html:`<h2> Your OTP Code: ${otp} `

        })
        console.log("OTP sent successfully")
        
    } catch (error) {
        console.log("error sending email:" + error.message)
    }
}

  