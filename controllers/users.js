const bcrypt = require('bcrypt');
const express = require('express')
const { User } = require('../models')
const jwt = require('jsonwebtoken');
require("dotenv").config()

/*************** Create JWT Token ***************/
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "10d" })
}


/*************** Register User ***************/
const registerUser = async (req, res, next) => {

  const { email, password } = req.body

  // Check if all fields are used
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" })
  }

  // Check Email
  const exist = await User.findOne({ email })
  if (exist) {
    return res.status(400).json({ error: "Email Already Exist" })
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  try {
    // Register User
    const user = await User.create({ email, password: hashedPassword })
    // Create JWT Token
    const token = createToken(user._id)
    res.status(201).json({ email, token })
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

/*************** Login User ***************/
const loginUser = async (req, res, next) => {

  const { email, password } = req.body

  // Check if all fields are used
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" })
  }

  // Check Email
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json({ error: "Wrong Email" })
  }

  // Check Password
  const matchPassword = await bcrypt.compare(password, user.password)
  if (!matchPassword) {
    return res.status(400).json({ error: "Wrong Password" })

  }
  try {
    // Create JWT Token
    const token = createToken(user._id)
    res.status(201).json({ email, token })
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}


module.exports = {
  registerUser,
  loginUser,
}
