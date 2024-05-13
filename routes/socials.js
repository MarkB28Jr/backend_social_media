const express = require('express')
const router = express.Router()

const socialRouter = require('../controllers/socials')

router.get('/', socialRouter.index)
router.post('/', socialRouter.create)
router.get('/:id', socialRouter.show)

module.exports = router