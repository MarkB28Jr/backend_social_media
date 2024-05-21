const express = require('express')
const router = express.Router()
const usersRouter = require('../controllers/users')

/*************** Register User ***************/
router.post('/register', usersRouter.registerUser)
/*************** Login User ***************/
router.post('/logoff', usersRouter.logoffUser)
/*************** Login User ***************/
router.post('/login', usersRouter.loginUser)
/*************** Profile ***************/
router.get('/social', usersRouter.getProfile)

module.exports = router