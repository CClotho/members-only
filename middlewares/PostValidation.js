const {checkSchema} = require("express-validator");
const mongoose = require('mongoose');
const User = require('../models/User')

const PostValidation = checkSchema({
  
    title: {
        isString: true,
        notEmpty: true,
        escape: true,
        errorMessage: "Title must not be empty"
    },
    message: {
        isString: true,
        escape: true,
        errorMessage: ""
    }

})

module.exports = PostValidation;