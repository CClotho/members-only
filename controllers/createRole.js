const Role = require('../models/Role');

const createRole = async() => {

    const newRole = await new Role({
        role: "user"
    })

    newRole.save();

    console.log("Created a new role");
}

module.exports = createRole;