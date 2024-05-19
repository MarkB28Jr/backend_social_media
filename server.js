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

/*************** App ***************/
app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
  res.setHeader('Set-Cookie', 'SameSite=none')
  next()
})
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: 'http://127.0.0.1:5173',
  credentials: true
}))
app.use(morgan('dev'))

app.use('/social', socialRouter)
app.use('/users', usersRouter)

app.listen(PORT, () => console.log(`Connected to ${PORT}!`))
