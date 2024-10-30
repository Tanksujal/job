const User = require('../models/user')
const Profile = require('../models/profile')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path')
const fs = require('fs')
const Job = require('../models/job')
const Application = require('../models/application')
const registerUser = async(req,res) => {
    try {
      console.log(req.body);
      
        const { fullName, email, password, mobileNumber, status } = req.body;
        
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
          return res.status(400).send({
            success: false,
            message: "User already exists"
          });
        }
    
        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
         // Generate a salt with 10 rounds
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with salt
    
        // Create a new user
        const user = new User({
          fullName,
          email,
          password: hashedPassword, // Store the hashed password
          mobileNumber,
          status
        });
        const profile = new Profile({
          user:user._id,
        })
        // Save the user to the database
        await user.save();
        await profile.save()
        res.status(201).send({
          success: true,
          message: 'User registered successfully',
        });
    
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send({
          success: false,
          message: 'Server error. Please try again later.',
        });
      }
}
const LoginUser = async(req,res) => {
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).send({
                success : false,
                message:"User does not exist"
            })
        }
        const isValidPassword = await bcrypt.compare(password,user.password)
        if(!isValidPassword){
            return res.status(400).send({
                success : false,
                message:"Invalid password"
            })
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email }, // Payload
            process.env.JWT_SECRET, // Secret key from environment variables
            { expiresIn: '7d' } // Token expiration (7 days)
        );
        res.cookie('usertoken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        });
        res.status(200).send({
            success: true,
            message: 'Login successful',
            token, // Optionally return the token if needed for client-side management
        });
    } catch (error) {
        console.error('Error during login:', error);
    res.status(500).send({
      success: false,
      message: 'Server error. Please try again later.',
    });
    }
}
const getuser  = async(req,res) => {
  try {
    const user = req.user
    res.status(200).send({
      success: true,
      user
      })
  } catch (error) {
    console.error('Error during get user:', error);
    return false
  }
}
const LogoutUser = (req, res) => {
    try {
      // Clear the token cookie
      res.clearCookie('usertoken',{
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      });
  
      // Send success response
      return res.status(200).send({
        success: true,
        message: 'Logout successful',
      });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).send({
        success: false,
        message: 'Server error. Please try again later.',
      });
    }
};
const updateprofile = async(req,res) => {
  try {
    const {fullName,status,currentLocation,city,mobileNumber,email} = req.body
    const userid = req.user._id
    const UpdateUser = await User.findByIdAndUpdate(userid,{
      fullName,status,currentLocation,city,mobileNumber,email,
    },{new:true})
    if (!UpdateUser) {
      return res.status(404).send({success:false, message: "User not found" });
    }
    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      user: UpdateUser
    });
  } catch (error) {
    console.log(error);
    return false
  }
}
const userresuemupdate = async(req,res) => {
  try {
    const image = req.file.filename;
    const userId = req.user._id
    let profileupdateresume = await Profile.findOne({user:userId})
    profileupdateresume.resume = image
    await profileupdateresume.save()
    res.status(200).send({
      success: true,
      message: "Resume updated successfully"})
  } catch (error) {
    console.log(error);
    return false
  }
}
const getuserprofile = async(req,res) => {
  try {
    const userId = req.user._id
    const getprofile = await Profile.findOne({user:userId})
    if(!getprofile){
      return res.status(404).send({success:false, message: "User not found" });
    }
    res.status(200).send({
      success: true,
      message: "User profile found",
      profile: getprofile
    })
    
  } catch (error) {
    
  }
}
const deleteresume = async(req,res) => {
  try {
    const userId = req.user._id
    const profile = await Profile.findOne({ user: userId });
    if (!profile || !profile.resume) {
      return res.status(404).send({ success: false, message: "Resume not found" });
    }
    const resumePath = path.join(__dirname, '..', 'uploads', 'resume', profile.resume)
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      { $unset: { resume: "" } },
      { new: true }
    );
    if (updatedProfile) {
      fs.unlink(resumePath, (err) => {
        if (err) {
          console.error("Error deleting the resume file:", err);
          return res.status(500).send({ success: false, message: "Error deleting resume file" });
        }

        return res.status(200).send({ success: true, message: "Resume deleted successfully" });
      });
    } else {
      return res.status(404).send({ success: false, message: "Profile not found" });
    }
  } catch (error) {
    console.log(error);
    return false
  }
}
const updateresumeheadline = async(req,res) => {
  try {
    const  {Updateresumeheadline} = req.body
    const userId = req.user._id
    const profile = await Profile.findOne({ user: userId });
    profile.resumeHeadline = Updateresumeheadline
    await profile.save()
    res.status(200).send({ success: true, message: "Resume headline updated successfully"
      })
  } catch (error) {
    console.log(error);
    return false
  }
}
const updateskills = async(req,res) => {
  try {
    const { skills } = req.body;
    const userId = req.user._id
    const userprofile  = await Profile.findOne({user:userId})
    userprofile.skills = skills
    await userprofile.save()
    res.status(200).send({ success: true, message: "Skills updated successfully" })
  } catch (error) {
    console.log(error);
    return false
  }
}
const getalljob = async(req,res) => {
  try {
    const job = await Job.find({})
    return res.status(200).send({
      success: true,
      job
    })
  } catch (error) {
    console.log(error);
    return false
  }
}
const onejobdetails = async(req,res) => {
  try {
    const {id} = req.body
    const onejob = await Job.findById(id)
    if(!onejob){
      return res.status(404).send({ success: false, message: "Job not found"
        })
    }

    return res.status(200).send({ success: true, message: "Job found",job:onejob
    })
  } catch (error) {
    console.log(error);
    return false
  }
}
const hasapplicationdetails = async(req,res) => {
  try {
    const {id} = req.body
    const userId = req.user.id
    const application = await Application.findOne({user: userId, job: id });
    console.log(application);
    
    const hasApplied = application ? true : false;

    return res.status(200).send({ success: true,hasApplied:hasApplied
    })
  } catch (error) {
    console.log(error);
    return false
  }
}
module.exports = {registerUser,LoginUser,LogoutUser,getuser,updateprofile,userresuemupdate,getuserprofile,deleteresume,updateresumeheadline,updateskills,getalljob,onejobdetails,hasapplicationdetails}