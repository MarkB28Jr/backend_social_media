const express = require('express')
const router = express.Router()
const socialRouter = require('../controllers/socials')

/*************** SOCIAL ***************/
router.get('/', socialRouter.index)
router.get('/community', socialRouter.indexCommunity)
router.post('/', socialRouter.create)
router.post('/community', socialRouter.createCommunity)
router.get('/:id', socialRouter.show)
router.get('/community/:id', socialRouter.showCommunity)
router.delete('/:id', socialRouter.delete)
router.delete('/community/delete/:id', socialRouter.delete)
router.put('/:id', socialRouter.update)
router.put('/community/:id', socialRouter.updateCommunity)

module.exports = router