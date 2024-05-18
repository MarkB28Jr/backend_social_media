const bcrypt = require('bcrypt');
const express = require('express')
const { User } = require('../models')
const jwt = require('jsonwebtoken');
require("dotenv").config()


/*************** REMOVED ALL status("number") FOR POP UP DISPLAYING WHATS WRONG ***************/

/*************** Create JWT Token ***************/
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "10d" })
}

/*************** Register User ***************/
const registerUser = async (req, res, next) => {

  const { name, email, password } = req.body
  // Check if all fields are used
  if (!email || !password) {
    return res.json({ error: "All fields are required" })
  }
  // Check Password Length
  if (!password || password.length < 8) {
    return res.json({ error: "Password must be at least 8 characters" })
  }
  // Check Email
  const exist = await User.findOne({ email })
  if (exist) {
    return res.json({ error: "Email Already Exist" })
  }
  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  try {
    // Register User
    const user = await User.create({ name, email, password: hashedPassword })
    // Create JWT Token
    const token = createToken(user._id)
    res.status(201).json({ email, token })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

/*************** Login User ***************/
const loginUser = async (req, res, next) => {

  const { email, password } = req.body
  // Check if all fields are used
  if (password.length < 8) {
    return res.json({ error: "Password must be at least 8 characters" })
  }
  if (!email || !password) {
    return res.json({ error: "All fields are required" })
  }
  // Check Email
  const user = await User.findOne({ email })
  if (!user) {
    return res.json({ error: "Email Does Not Exists" })
  }
  // Check Password
  const matchPassword = await bcrypt.compare(password, user.password)
  if (matchPassword) {
    // jwt.sign({ email: user.email, id: user._id, name: user.name }, process.JWT_SECRET, {}, (err, token) => {
    //   if (err) throw err
      
    // })
  }
  if (!matchPassword) {
    return res.json({ error: "Wrong Password" })
  }
  try {
    // Create JWT Token
    const token = createToken(user._id)
    // return res.cookie('token', token).json(user)
    res.status(201).json({ email, token })
  } catch (error) {
    return res.json({ error: error.message })
  }
}
/*************** Export ***************/
module.exports = {
  registerUser,
  loginUser,
}
