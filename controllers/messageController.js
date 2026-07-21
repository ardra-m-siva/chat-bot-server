const { handleError } = require("../middlewares/handleError");
const chatModel = require("../models/chatModel");
const messageModel = require('../models/messageModel')

module.exports.sendMessage = async (req, res) => {
    try {
        const media = req.file;
        const senderId = req.id
        const { chatId, text, messageType } = req.body
        if (!text?.trim() && !media)
            return { code: 400, message: 'Either text or media file is required' }
        if (["image", "video", "file"].includes(messageType) && !media) {
            return { code: 400, message: `${messageType} messages require a media file.` }
        }
        const newMessage = await messageModel({
            chat: chatId,
            senderId,
            messageType,
            media: media.path || '',
            text
        }).save()

        return { data: newMessage, message: 'Message saved successfully', success: true }
    } catch (error) {
        return handleError(error);
    }
}

module.exports.getMessages = async (req, res) => {
    try {
        const senderId = req.id;
        const { chatId } = req.body;
        const { limit = 30, page = 1 } = req.query;
        const skip = (page - 1) * limit
        const existingChat = await chatModel.findById(chatId)
        if (!existingChat)
            return { code: 404, message: 'chat not found!' }
        const isParticipant = existingChat.participants.some(participants => participants.equals(senderId))
        if (!isParticipant)
            return { code: 403, message: "You are not authorized to access this chat." }
        const chats = await messageModel.find({ chat: chatId }).sort({ createdAt: 1 }).skip(skip).limit(limit)
        return { data: chats, message: 'Messages fetched successfully', success: true }
    } catch (error) {
        return handleError(error)
    }
}