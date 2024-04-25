const User = require("../models/User")
const Role = require("../models/Role")
const asyncHandler = require('express-async-handler');

//Safeguard route

const isAdmin = asyncHandler(async(req, rex, next) => {

    const role = await Role.findOne({_id: req.user.role})
    if(req.user && role.role === 'admin')  {
        return next();
    }
    else {
        res.status(403).json({error: "Unauthorized"})
    }
})


const SetUser = asyncHandler(async(req, res, next) => {


    if(req.user) {
   
        const user = await User.findOne({_id: req.user._id})
        .populate({path: "role", model: "Role"})
        .populate({path:"user", model:"Account"})
        .exec();
        console.log("this is the user", user)
        res.locals.user = req.user
        res.locals.username = user.user.username;
        res.locals.role = user.role.role;
        return next();
    }

    else {
       return next();
    }
     
})


const checkRole = (req,res,next)=> {

    if(!req.user) {
        return res.status(403).redirect('/');
    }
    else {
        next();
    }
}


const isMember = asyncHandler(async(req, res ,next) => {
    
    const role = await Role.findOne({_id: req.user.role})
    console.log(req.user === true)
    if(!req.user || req.user  && role.role === "member") {
        return res.status(403).redirect('/');
    }
    else {
       return next();
    }
})


module.exports = { isAdmin, SetUser, checkRole, isMember}
