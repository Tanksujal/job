const express  = require('express')
const router = express.Router()
router.use('/',require('./userRoutes'))
router.use('/company',require('./companyroutes'))
router.use('/application',require('./applicationRoutes'))
module.exports = router