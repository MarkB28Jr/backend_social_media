require("dotenv").config()
const { User } = require('../models')
const { hashPassword, comparePassword, createToken } = require('../middlewares/auth')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET


/*************** Register User ***************/
const registerUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body
    // Check if all fields are used
    if (!email) {
      return res.json({ error: "Email is required" })
    }
    if (!password || password.length < 8) {
      return res.json({ error: "Password is required and needs to be 8 Characters" })
    }
    // Check username
    const exist = await User.findOne({ email })
    if (exist) {
      return res.json({ error: "That Email Already Exist" })
    }
    // Hash password
    const hashedPassword = await hashPassword(password)
    // Register User
    const user = await User.create({ email, username, password: hashedPassword })
    return res.status(201).json({ user })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

/*************** Login User ***************/
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    // Check if all fields are used
    if (!email || (!password && password.length < 8)) {
      return res.json({ error: "All fields are required or password more than 8" })
    }
    // Check username
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ error: "That Email Does Not Exists" })
    }
    // Check Password
    const matchPassword = await comparePassword(password, user.password)
    if (!matchPassword) {
      return res.json({ error: "Wrong Password" })
    }
    if (matchPassword) {
      jwt.sign({ email: user.email, id: user._id, name: user.name }, JWT_SECRET, {}, (err, token) => {
        if (err) throw err
        res.cookie('token', token, { SameSite: 'none', secure: true, httpOnly: true }).json(user)
      })
    }
  } catch (error) {
    return res.json({ error: error.message })
  }
}


/*************** Get User Profile to stay logged in ***************/
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

/*************** Logoff User ***************/
const logoffUser = async () => {
  res.cookie('token', '', { SameSite: 'none', secure: true }).json({ message: "Logged Out" })
}

/*************** Export ***************/
module.exports = {
  registerUser,
  loginUser,
  logoffUser,
  getProfile
}
