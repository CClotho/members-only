const asyncHandler = require('express-async-handler');
const  validate = require('../middlewares/ValidationResult');
const FormValidation = require("../middlewares/FormValidation");
const {validationResult} = require("express-validator");
const bcrypt= require('bcryptjs');
const passport = require('../middlewares/AuthMiddleware');
const {isAdmin} = require('../middlewares/SetUser');
const Role = require("../models/Role")
const Account = require("../models/Account");
const Message = require("../models/Message");
const User = require("../models/User");




exports.getLoginForm = (req, res,next) => {
console.log(req.session)
  console.log("The error message from req.session.messages", req.session.messages);
    if(req.session.messages) {
      errors = "Incorrect username or password"
    }
    res.render('login-form')
}


exports.Login = passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: "/",
  failureMessage:true, 
})

exports.getMessages = asyncHandler(async(req, res, next) => {
    const messages = await Message.find({}).populate('author', 'username');

  return res.render('index', {Posts: messages});
})

exports.getSignUpForm = (req, res, next) => {
    res.render('sign-up-form')
}

exports.SignUp = asyncHandler(async (req, res, next) => {
  
    console.log("This is request validation errors", res.locals.validationErrors);
  
   const errors = res.locals.errors;
    if(errors) {
      res.render('sign-up-form');
  
    }
    else {
      const addRole = await Role.findOne({role: "user"});
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        
        const createAccount = new Account({
          username: req.body.username,
          password: hashedPassword
        })
  
    
         
      await createAccount.save();
  
      const createUser = new User({
        user: createAccount._id,
        role: addRole._id
      })
      await createUser.save();
      console.log(createAccount);
  
      });
     
      return res.redirect('/');
    
    }
  })


  exports.Logout =  function(req,res, next) {
    req.session.destroy(function(err){
      if(err) {
        return next(error);
      }
    return  res.clearCookie('connect.sid', {httpOnly: true, path: "/"}).redirect('/');
  
  
    })
   
  
  }