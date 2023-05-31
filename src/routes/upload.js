const { saveAndConvert } = require('../controllers/upload')
const upload = require('../multer/multer')

const router = require('express').Router()

router.post('/', upload.single('video'), saveAndConvert)

module.exports = router