const express = require('express')
const router = express.Router()
const usersRouter = require('../controllers/socials')

/*************** Register User ***************/
router.post('/register', usersRouter.registerUser)

/*************** Login User ***************/
router.post('/login', usersRouter.loginUser)
router.post('/logoff', usersRouter.logOff)

module.exports = router