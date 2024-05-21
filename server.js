require("dotenv").config()
require("./config/db.connection")

/*************** Const ***************/
const { PORT } = process.env
const express = require("express")
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const socialRouter = require('./routes/socials')
const usersRouter = require('./routes/users')
// const jwt = require('jsonwebtoken')
// const JWT_SECRET = process.env.JWT_SECRET
// const ws = require('ws')

/*************** App ***************/
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))
app.use(morgan('dev'))

app.use('/social', socialRouter)
app.use('/users', usersRouter)

app.listen(PORT, () => console.log(`Connected to ${PORT}!`))
// const server = app.listen(PORT, () => console.log(`Connected to ${PORT}!`))

// const wss = new ws.WebSocketServer({ server })
// wss.on('connection', (connection, req) => {
//   const cookies = req.headers.cookie
//   if (cookies) {
//     const tokenCookie = cookies.split(';').find(str => str.startsWith('token='))
//     if (tokenCookie) {
//       const token = tokenCookie.split('=')[1]
//       if (token) {
//         jwt.verify(token, JWT_SECRET, {}, (err, userData) => {
//           if (err) throw err
//           console.log(userData)
//         }) 
//       }
//     }
//   }
// })