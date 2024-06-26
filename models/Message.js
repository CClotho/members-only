const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MessageSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
    title: {type: String, required: true},
    message: {type: String,  required: true},
})


module.exports = mongoose.model("Message", MessageSchema)