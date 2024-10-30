const Applicaton = require('../models/application')
const User = require('../models/user')
const applyjob = async(req,res) => {
    try {
        const userId = req.user._id
        const {job} = req.body
        const user = await User.findById(userId).populate('profile')
        const existapplication = await Applicaton.findOne({job:job})
        if(existapplication){
            return res.status(400).send({success:false, message:"Application already exist for this job"})
        }
        const application = await new Applicaton({
            user:userId,
            job:job,
            resume:user.profile.resume
        })
        await application.save()
        res.status(200).send({success:true, message:"Application submitted successfully",application})
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = {
    applyjob
}