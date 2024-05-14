const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const socialRouter = require('../controllers/socials')

router.get('/', socialRouter.index)

router.post('/', auth, socialRouter.create)

router.get('/:id', socialRouter.show)

router.delete('/:id', socialRouter.delete)

router.put('/:id', socialRouter.update)

module.exports = router