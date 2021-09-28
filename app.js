"use strict"

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const fs = require('fs')
const path = require('path')

const home = fs.readFileSync('./public/index.html')

const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host:  "mail.google.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "nodenodemailer123@gmail.com", // generated ethereal user
      pass: "nodenode123", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <nodenodemailer123@gmail.com>', // sender address
    to: "rehimilkin346@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);

app.get('/', (req,res) => {
    res.writeHead(200, 'content/type', 'text-html')
    res.write(home)
})

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT,(req,res) => {
    console.log(`Server started on port ${PORT}`)
})