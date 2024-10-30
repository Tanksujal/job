const User = require('../models/user')
const jwt = require('jsonwebtoken')
const IsLoggedin = async (req, res, next) => {
    try {
        const token = req.cookies.usertoken;
        // console.log(token);
        
        if (!token) {
            return res.status(401).json({ success: false, message: "You are not logged in!" });
        }

        // Verify the token and extract the payload (user data)
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have JWT_SECRET in your .env
        
        
        // Fetch the user from the database using the decoded token's user ID (or other data)
        const user = await User.findOne({_id : decoded.userId}); // Assuming the token contains user id


        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        // Attach the user to the req object
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Authentication failed!" });
    }
};
const PreventLogin = async(req,res,next) => {
    try {
        const token = req.cookies.usertoken
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
    IsLoggedin,PreventLogin
}