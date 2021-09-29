const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const fs = require('fs')
const path = require('path')

const home = fs.readFileSync('./public/index.html')

const nodemailer = require("nodemailer");

app.get('/', (req,res) => {
    res.writeHead(200, 'content/type', 'text-html')
    res.write(home)
})

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT,(req,res) => {
    console.log(`Server started on port ${PORT}`)
})