const {checkSchema} = require("express-validator");
const Account = require('../models/Account');


const FormValidation = checkSchema({
    username: {
        isString: true,
        notEmpty: true, 
        escape: true,
        errorMessage: "Username must not be empty",
        custom: {
            options: async(value) => {
                const findAccount = await Account.findOne({username:value})
                if(findAccount) {throw new Error("Username already exist!")}
               }
            }
            
        },
    password: {
        isString: true,
        notEmpty: true,
        escape: true,
        errorMessage: "Password must not be empty"
    }
    
})


module.exports = FormValidation;

