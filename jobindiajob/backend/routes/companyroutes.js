const express = require('express')
const { registercom, logincom, logoutcom, getprofile, allprofile, addjob, updatejob, getcompanyjob, deletejob, getapplicationjobs } = require('../controllers/companycontroller')
const { PreventLogincom, IsLoggedincom } = require('../middlewares/companymiddlewares')
const router = express.Router()
router.post('/register',PreventLogincom,registercom)
router.post('/login',PreventLogincom,logincom)
router.post('/logout',logoutcom)
router.get('/getprofile',IsLoggedincom,getprofile)
router.get('/allprofile',allprofile)
router.post('/addjob',IsLoggedincom,addjob)
router.post('/updatejob',IsLoggedincom,updatejob)
router.get('/getcompanyjob',IsLoggedincom,getcompanyjob)
router.get('/deletejob',IsLoggedincom,deletejob)
router.get('/getapplicationjobs',IsLoggedincom,getapplicationjobs)
module.exports = router