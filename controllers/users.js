const bcrypt = require('bcrypt');
const express = require('express')
const { User } = require('../models')

const registerUser = async (req, res, next) => {
  const { email, password } =req.body
  // Check if all fields are used
  if ( !email || !password ){
    return res.status(400).json({error: "All fields are required"})
  }
  // Check Email
  const exist = await User.findOne({ email })
  if (exist){
    return res.status(400).json({error: "Email Already Exist"})
  }
  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  try {
    const user = await User.create({ email, password : hashedPassword })
    res.status(201).json({ email} )
  } catch (error) {
      return res.status(400).json(error)
  }
}

const loginUser = async (req, res, next) => {
  res.send("Login")
  // try {
  //     res.json(await Users.create(req.body))
  // } catch (error) {
  //     res.json(400).json(error)
  // }
}


module.exports = {
  registerUser,
  loginUser,
}
