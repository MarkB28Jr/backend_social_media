require("dotenv").config()
require("./config/db.connection")
/*************** Const ***************/
const { PORT } = process.env
const express = require("express")
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const communitysRouter = require('./routes/communitys')
const usersRouter = require('./routes/users')
const CLIENT_URL = process.env.CLIENT_URL
/*************** App ***************/
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}))
app.use(morgan('dev'))
app.use('/users', usersRouter)
app.use('/communitys', communitysRouter)

app.listen(PORT, () => console.log(`Connected to ${PORT}!`))