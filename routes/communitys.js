const express = require('express')
const router = express.Router()
const communitysRouter = require('../controllers/communitys')

/*************** SOCIAL ***************/
router.get('/', communitysRouter.index)
router.post('/', communitysRouter.create)
router.get('/:id', communitysRouter.show)
router.delete('/:id', communitysRouter.delete)
router.put('/:id', communitysRouter.update)
// router.delete('/community/delete/:id', communitysRouter.delete)
// router.get('/community', communitysRouter.indexComment)
// router.post('/community', communitysRouter.createComment)
// router.get('/:id/comment', communitysRouter.showComment)
// router.put('/:id/comment', communitysRouter.updateComment)

module.exports = router