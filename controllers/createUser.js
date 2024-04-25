const User = require('../models/User');
const Account = require('../models/Account')
const Role = require('../models/Role');

const createUser = async() => {
  
    const findAcc = await Account.findOne({username: "Kelisi"});
    const findRole = await Role.findOne({role: "user"});

    const newUser = await new User({
        user: findAcc._id,
        role: findRole._id
    })

    newUser.save();

    console.log("Created a new user");
}

module.exports = createUser;