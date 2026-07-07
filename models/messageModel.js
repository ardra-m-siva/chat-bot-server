const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chats',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    // receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    text: { type: String, trim: true },
    messageType: {
        type: String,
        enum: ["text", "image", "video", "file"],
        default: "text",
    },
    status: {
        type: String,
        enum: ["sent", "delivered", "seen"],
        default: "sent",
    },
    media: {
        type: String,
        default: ""
    }
}, { timestamps: true })

module.exports = mongoose.model('messages', messageSchema);