const express = require('express')
const router = express.Router()
const socialRouter = require('../controllers/socials')

/*************** SOCIAL ***************/
router.get('/', socialRouter.index)
router.get('/user', socialRouter.getUserIndex)
router.post('/', socialRouter.create)
router.get('/:id', socialRouter.show)
router.delete('/:id', socialRouter.delete)
router.put('/:id', socialRouter.update)


/*************** Profile ***************/
router.get('/profile', socialRouter.getProfile)


/*************** COMMUNITY ***************/
router.post('/community', socialRouter.createCommunity)
router.get('/community/:id', socialRouter.showCommunity)
router.get('/community', socialRouter.indexCommunity)

/*************** MESSAGE ***************/
router.post('/message', socialRouter.createMessage)
router.get('/message/:id', socialRouter.showMessage)
router.get('/message', socialRouter.indexMessage)

module.exports = router