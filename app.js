const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')

const home = fs.readFileSync('./public/index.html')

const tranporter = nodemailer.createTransport({
    host: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: 'nodenodemailer123@gmail.com',
        pass: 'nodemailer123'
    }
})

async function sendMail(){
    const info = tranporter.sendMail({
        from: '"Nodemailer message"  <nodenodemailer123@gmail.com>',
        to: 'hquliyev2021@gmail.com',
        text: 'Hello world'
    })
    console.log('Message sent: %s', info.messageId)
}

app.get('/', (req,res) => {
    res.writeHead(200, 'content/type', 'text-html')
    res.write(home)
})

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT,(req,res) => {
    console.log(`Server started on port ${PORT}`)
})