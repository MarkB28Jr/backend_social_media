const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const socialRouter = require('../controllers/socials')


/*************** SOCIAL ***************/
router.get('/', socialRouter.index)
router.get('/user', auth, socialRouter.getUserIndex)
router.post('/', auth, socialRouter.create)
router.get('/:id', socialRouter.show)
router.delete('/:id', auth, socialRouter.delete)
router.put('/:id',auth, socialRouter.update)

/*************** COMMUNITY ***************/
router.post('/community', auth, socialRouter.createCommunity)
router.get('/community/:id', socialRouter.showCommunity)
router.get('/community', socialRouter.indexCommunity)

/*************** MESSAGE ***************/
router.post('/message', auth, socialRouter.createMessage)
router.get('/message/:id', socialRouter.showMessage)
router.get('/message', socialRouter.indexMessage)

module.exports = router