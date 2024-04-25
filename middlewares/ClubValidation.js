const{ checkSchema } = require("express-validator");


const checkClubPassword = checkSchema({
    club_password: {
        isString: true,
        notEmpty: true,
        errorMessage: "Password shouldn't be empty!",
        custom: {
            options: value => {
                if(value !== "sandwich") {
                    throw new Error("Wrong password!");
                }
            }
        }
    }
})


module.exports = checkClubPassword;