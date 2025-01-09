import nodemailer from "nodemailer"
import express from "express"

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,
    port: 587,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }

});

router.get('/',(req,res)=>{
    res.send("Hello world");

    const mailOptions = {
        from : process.env.EMAIL,
        to: process.env.TO_EMAIL,
        subject: "New User",
        text: "Thank you for joining"
    }

    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log("There is some error ",err);
        }else{
            console.log('Email sent :',info.response)
        }
    })
})

export default router;

