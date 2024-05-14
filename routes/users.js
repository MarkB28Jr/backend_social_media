const express = require('express')
const router = express.Router()

const usersRouter = require('../controllers/users')

// Register User
router.post('/', usersRouter.registerUser)

// Login User
router.post('/login', usersRouter.loginUser)

module.exports = router