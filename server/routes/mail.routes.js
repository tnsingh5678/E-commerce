import nodemailer from "nodemailer"
import express, { text } from "express"

const router = express.Router();

export const transporter = nodemailer.createTransport({
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

router.get('/updatepassword',(req,res)=>{
    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.TO_EMAIL,
        subject: "Password change",
        text: ""  // some magic link to refer the page
    }

    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log("Error while new pasword link generation")
        }else{
            console.log("Link generation successful", info.response)
        }
    })
})

export default router;

