const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'messages' }
}, { timestamps: true })

module.exports = mongoose.model('chats', chatSchema)