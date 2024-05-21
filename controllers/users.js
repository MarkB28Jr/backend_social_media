const bcrypt = require('bcrypt')
const { User } = require('../models')
const { hashPassword, comparePassword } = require('../middlewares/auth')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
require("dotenv").config()

/*************** Create JWT Token ***************/
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "10d" })
}

/*************** Register User ***************/
const registerUser = async (req, res, next) => {

  const { username, password } = req.body
  // Check if all fields are used
  if (!username || !password) {
    return res.json({ error: "All fields are required" })
  }
  // Check Password Length
  if (!password || password.length < 8) {
    return res.json({ error: "Password must be at least 8 characters" })
  }
  // Check username
  const exist = await User.findOne({ username })
  if (exist) {
    return res.json({ error: "username Already Exist" })
  }
  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  try {
    // Register User
    const user = await User.create({ username, password: hashedPassword })
    // Create JWT Token
    const token = createToken(user._id)
    res.status(201).json({ username, token })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

/*************** Login User ***************/
const loginUser = async (req, res, next) => {
  const { username, password } = req.body
  // Check if all fields are used
  if (!username || (!password && password.length < 8)) {
    return res.json({ error: "All fields are required or password more than 8" })
  }
  // Check username
  const user = await User.findOne({ username })
  if (!user) {
    return res.json({ error: "username Does Not Exists" })
  }
  // Check Password
  const matchPassword = await bcrypt.compare(password, user.password)
  if (matchPassword) {
    jwt.sign({ username: user.username, id: user._id}, process.JWT_SECRET, {}, (err, token) => {
      if (err) throw err
    })
  }
  if (!matchPassword) {
    return res.json({ error: "Wrong Password" })
  }
  try {
    // Create JWT Token
    const token = createToken(user._id)
    // return res.cookie('token', token).json(user)
    res.status(201).json({ username, token })
  } catch (error) {
    return res.json({ error: error.message })
  }
}

const logoffUser = async () => {
  res.cookie('token', '', { SameSite: 'none', secure: true }).json({ message: "Logged Out" })
}

const getProfile = (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ error: 'No token found' });
    }
    jwt.verify(token, JWT_SECRET, {}, (err, userData) => {
      if (err) {
        console.error('Error verifying JWT token:', err);
        return res.status(401).json({ error: 'Invalid token' });
      }
      res.json(userData);
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/*************** Export ***************/
module.exports = {
  registerUser,
  loginUser,
  logoffUser,
  getProfile
}
