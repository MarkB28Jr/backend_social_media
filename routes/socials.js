const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const socialRouter = require('../controllers/socials')


/*************** SOCIAL ***************/
/*************** Index All Social ***************/
router.get('/', socialRouter.index)
/*************** Create Social ***************/
router.post('/', auth, socialRouter.create)
/*************** Show Individual Social ***************/
router.get('/:id', socialRouter.show)
/*************** Delete Social ***************/
router.delete('/:id', socialRouter.delete)
/*************** Update Social ***************/
router.put('/:id', socialRouter.update)

/*************** COMMUNITY ***************/
/*************** Create Community ***************/
router.post('/community', auth, validateCommunity, socialRouter.createCommunity)
/*************** Show Individual Community ***************/
router.get('/community/:id', socialRouter.showCommunity)
/*************** Index All Community ***************/
router.get('/community', socialRouter.indexCommunity)

/*************** MESSAGE ***************/
/*************** Create Message ***************/
router.post('/message', auth, validateCommunity, socialRouter.createMessage)
/*************** Show Individual Message ***************/
router.get('/message/:id', socialRouter.showMessage)
/*************** Index All Message ***************/
router.get('/message', socialRouter.indexMessage)

module.exports = router