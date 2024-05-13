const mongoose = require('mongoose')
const {DATABASE_URI} = process.env

mongoose.connect(DATABASE_URI)

mongoose.connection
  .on('open', () => console.log(`Connected to MongoDB to our ${mongoose.connection.name}`))
  .on('close', () => console.log(`Disconnected to MongoDB from our ${mongoose.connection.name}`))
  .on('error', (error) => console.log(error))