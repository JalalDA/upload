const router = require('express').Router()
const upload = require('../multer/multer')
const uploadRouter = require('./upload')

router.use('/upload', uploadRouter)

module.exports = router