const Company = require('../models/company')
const jwt = require('jsonwebtoken')
const IsLoggedincom = async(req,res,next) => {
    try {
        const token = req.cookies.companytoken
        if(!token) {
            return res.status(401).send({success:false,message: "You are not logged in!"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have JWT_SECRET in your .env
        
        
        
        // Fetch the user from the database using the decoded token's user ID (or other data)
        const user = await Company.findById(decoded.id); // Assuming the token contains user id
        
        

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        // Attach the user to the req object
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return false
    }
}
const PreventLogincom = async(req,res,next) => {
    try {
        const token = req.cookies.companytoken
        if(token) {
            return res.status(401).send({success:false,message: "You are already logged in!"})
        }
        next()
    } catch (error) {
        console.log(error);
        return false
    }
}
module.exports = {
    IsLoggedincom,PreventLogincom
}