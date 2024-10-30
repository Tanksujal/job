const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Company = require('../models/company')
const Job = require('../models/job')
const { v4: uuidv4 } = require('uuid'); 
const Application = require('../models/application');
const registercom = async(req,res) => {
  console.log(req.body);
  
    const { companyName, companyEmail, companyPhone, password, industryType, numberOfEmployees, gstNumber } = req.body.obj;

  // Validate required fields
  // if (!companyName || !companyEmail || !companyPhone || !password || !industryType || !numberOfEmployees || !gstNumber) {
  //   return res.status(400).send('All fields are required');
  // }

  // Validate GST Number Format
//   if (!gstNumberRegex.test(gstNumber)) {
//     return res.status(400).send('Invalid GST number format');
//   }

  try {
    // Check if the GST number already exists
    const existingCompany = await Company.findOne({ gstNumber });
    if (existingCompany) return res.status(400).send('GST number already registered');

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const registrationNumber = `REG${uuidv4().split('-').join('').slice(0, 6).toUpperCase()}`; 
    // Create a new company document
    const newCompany = new Company({
      companyName,
      registrationNumber,
      companyEmail,
      companyPhone,
      password: hashedPassword,
      industryType,
      numberOfEmployees,
      gstNumber
    });

    // Save the company to the database
    await newCompany.save();

    res.status(201).send({success:true, message: 'Company registered successfully!' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Server error');
  }
}
const logincom = async(req,res) => {
    const { companyEmail, password } = req.body;

  // Validate required fields
  if (!companyEmail || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    // Find the company by email
    const company = await Company.findOne({ companyEmail });
    if (!company) {
      return res.status(400).send('Invalid email or password');
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password');
    }
    

    // Generate a JWT token
    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Set the token as an HTTP-only cookie
    res.cookie('companytoken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Server error');
  }
}
const logoutcom = async(req,res) => {
    try {
        res.clearCookie('companytoken', {
            // httpOnly: true,
            // secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
            // expires: new Date(0) // Set expiration date to the past
          });
        
          res.status(200).json({ message: 'Logout successful!' });
    } catch (error) {
        console.log(error);
        return false
    }
}
const getprofile = async(req,res) => {
  try {
    const userId = req.user._id
    let companyprofile = await Company.findById(userId)
    if(!companyprofile){
      return res.status(404).send('Company not found')
      }
      res.status(200).send({
        success:true,companyprofile
      })
  } catch (error) {
    console.log(error);
    return false
  }
}
const allprofile = async(req,res) => {
  try {
    const companyprofile =await Company.find({})
    res.send({
      success:true,companyprofile
    })
  } catch (error) {
    console.log(error);
    return false
  }
}
const addjob = async (req, res) => {
  try {
    const {companyName, position, description, city, state, vacancy, salaryFrom, salaryTo, jobType, experience, skillsRequired,status,postedDate, lastDateToApply,closeDate} = req.body;

    const job = new Job({
      position,
      description,
      company:companyName,
      city,
      state,
      numberOfVacancies:vacancy,
      salaryFrom,
      salaryTo,
      employmentType:jobType,
      experienceLevel:experience,
      skillsRequired,
      companyId: req.user._id,
      status,
      postedDate,
      lastDate:lastDateToApply,
      closedDate:closeDate
    });

    await job.save();
    return res.status(200).send({
      success: true,
      job
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Server error'
    });
  }
};
const updatejob = async(req,res) => {
  try {
    const id = req.query.id
    const {companyName, position, description, city, state, vacancy, salaryFrom, salaryTo, jobType, experience, skillsRequired,status,postedDate, lastDateToApply,closeDate} = req.body;
    const job = await Job.findByIdAndUpdate(id, {
      position,
      description,
      company:companyName,
      city,
      state,
      numberOfVacancies:vacancy,
      salaryFrom,
      salaryTo,
      employmentType:jobType,
      experienceLevel:experience,
      skillsRequired,
      companyId: req.user._id,
      status,
      postedDate,
      lastDate:lastDateToApply,
      closedDate:closeDate})
      return res.status(200).send({
        success:true,message:"update succesfully",job})
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Server error'
    });
  }
}
const getcompanyjob = async(req,res) => {
  try {
    console.log(req.user);
    
    const job = await Job.find({companyId:req.user._id})
    console.log(job);
    
    if(!job) {
      return res.status(404).send({
        success: false,
        message:"no jobs found"})
    }
    
    return res.status(200).send({
      success:true,job})
  } catch (error) {
    
  }
}
const deletejob = async(req,res) => {
  try {
    const id = req.query.id
    const job = await Job.findByIdAndDelete(id)
    if(!job){
      return res.status(404).send({ 
        success: false,
        message: "Job not found" 
        });
    }
    return res.status(200).send({
      success:true,message:"delete succesfully",job})
  } catch (error) {
    
  }
}
const getapplicationjobs = async(req,res) => {
  try {
    const jobs = await Job.find({companyId:req.user.id})
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ success: false, message: 'No jobs found for this company.' });
    }
    const jobIds = jobs.map(job => job._id);

    // Step 3: Fetch all applications for these Job IDs using the $in operator
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate('user', 'fullName email mobileNumber') // Optional: Populate user details
      .populate('job', 'position company'); // Optional: Populate job details

    // Step 4: Return the applications
    return res.status(200).json({
      success: true,
      applications
    });

  } catch (error) {
    console.log(error);
    
  }
}
module.exports = {
    registercom,logincom,logoutcom,getprofile,allprofile,addjob,updatejob,getcompanyjob,deletejob,getapplicationjobs
}