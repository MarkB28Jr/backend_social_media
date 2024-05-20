const express = require('express')
const router = express.Router()
const usersRouter = require('../controllers/socials')
// const {authenticateUser} = require('../middlewares/auth')

/*************** Register User ***************/
router.post('/register', usersRouter.registerUser)
/*************** Login User ***************/
// router.post('/login', usersRouter.loginUser)
router.post('/logoff', usersRouter.logOff)
/*************** Profile ***************/
router.get('/profile', usersRouter.getProfile)

module.exports = router