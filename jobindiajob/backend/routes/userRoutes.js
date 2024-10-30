const express  = require('express')
const { registerUser, LogoutUser, LoginUser, getuser, updateprofile, userresuemupdate, getuserprofile, deleteresume, updateresumeheadline, updateskills, getalljob, onejobdetails, hasapplicationdetails } = require('../controllers/usercontroller')
const { PreventLogin, IsLoggedin } = require('../middlewares/usermiddlewares')
const router = express.Router()
const multer = require('multer')
const crypto = require('crypto')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/resume')
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12,function(err,name){ 
            const fn = name.toString("hex")+path.extname(file.originalname)
            cb(null, fn)
        })
    }
  })
  
const uploadresume = multer({ storage: storage })
router.post('/',PreventLogin,LoginUser)
router.post('/register',PreventLogin,registerUser)
router.post('/logout',LogoutUser)
router.get('/getuser',IsLoggedin,getuser)
router.post('/updateprofile',IsLoggedin,updateprofile)
router.post('/userreumeupdate',IsLoggedin,uploadresume.single('file'),userresuemupdate)
router.get('/getuserprofile',IsLoggedin,getuserprofile)
router.get('/deleteresume',IsLoggedin,deleteresume)
router.post('/updateresumeheadline',IsLoggedin,updateresumeheadline)
router.post('/updateskills',IsLoggedin,updateskills)
router.get('/getalljob',getalljob)
router.post('/getonejob',onejobdetails)
router.post('/hasapplicationdetails',IsLoggedin,hasapplicationdetails)
module.exports = router