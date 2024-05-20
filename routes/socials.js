const express = require('express')
const router = express.Router()
const socialRouter = require('../controllers/socials')

/*************** SOCIAL ***************/
router.get('/', socialRouter.index)
router.post('/', socialRouter.create)
router.get('/:id', socialRouter.show)
router.delete('/:id', socialRouter.delete)
router.put('/:id', socialRouter.update)

module.exports = router