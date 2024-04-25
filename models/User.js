const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:"Account", required: true},
    role: {type: Schema.Types.ObjectId, ref: "Role",  required: true}
})



module.exports = mongoose.model('User', UserSchema);