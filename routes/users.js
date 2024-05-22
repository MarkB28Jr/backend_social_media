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
// router.get('/social', usersRouter.getProfile)

router.get('/', usersRouter.index)
router.get('/:id', usersRouter.getUser)
router.put('/:id', usersRouter.updateUser)
router.delete('/:id/profile', usersRouter.delete)

module.exports = router