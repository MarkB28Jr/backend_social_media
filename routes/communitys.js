const express = require('express')
const router = express.Router()
const communitysRouter = require('../controllers/communitys')

/*************** SOCIAL ***************/
router.get('/', communitysRouter.index)
router.post('/', communitysRouter.create)
router.get('/communitys/:id', communitysRouter.show)
router.delete('/communitys/:id', communitysRouter.delete)
router.put('/communitys/:id', communitysRouter.update)

module.exports = router