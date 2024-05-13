require("dotenv").config()
require("./config/db.connection")

const { PORT } = process.env
const express = require("express")
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const socialRouter = require('./routes/socials')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/social', socialRouter)

app.listen(PORT, () => console.log(`Connected to ${PORT}!`))