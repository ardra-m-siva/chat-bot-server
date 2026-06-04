const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: 'user'
    },
    profilePhoto: String
}, { timestamp: true })
module.exports = mongoose.model('users', usersSchema)

