const express = require('express')
const { applyjob } = require('../controllers/applicationController')
const { IsLoggedin } = require('../middlewares/usermiddlewares')
const router = express.Router()
router.post('/applyjob',IsLoggedin,applyjob)
module.exports = router