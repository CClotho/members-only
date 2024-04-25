const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');
const User = require("../models/User")
const Role = require("../models/Role")



exports.getClubhouse = function(req,res,next) {

    res.render('clubhouse');
}

exports.JoinClubhouse = asyncHandler(async(req,res,next) => {

    const {club_password} = req.body
    // just double check
    if(club_password === "sandwich") {
        const updateUserRole = await User.findById(req.user._id)
        const memberRole = await Role.findOne({role: "member"});
        
        if(updateUserRole) {
            updateUserRole.role = memberRole._id

           await updateUserRole.save();

           return res.redirect('/');

        }
        
        if(!updateUserRole) {
            return res.render('clubhouse', {error: "User not found!"})
        }
    
    }
    else {

        return res.render('clubhouse', {error: "Incorrect Password!"})
    }
   
})



exports.createPost = asyncHandler(async(req,res,next)=> {
    
    const errors = res.locals.errors;
    if(errors) {
        console.log(errors)
      return  res.render('post-form')
    }
   
   else {
    const { title, message} = req.body;

    const newPost = await new Message({
        author: req.user.user,
        title: title,
        message: message

    })

    await newPost.save();

    console.log(newPost)

   return res.redirect('/');

   }

})

exports.getPostForm = asyncHandler(async(req,res,next)=> {
    res.render('post-form');
})