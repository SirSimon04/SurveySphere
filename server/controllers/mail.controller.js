import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'simi27272727@gmail.com',
    pass: process.env.GMAIL_PASSWORD
  }
});

var mailOptions = {
  from: 'simi27272727@gmail.com',
  to: 'simi@engelnetz.de',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};


transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});