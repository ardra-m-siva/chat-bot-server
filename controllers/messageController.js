const { handleError } = require("../middlewares/handleError")
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
        
    } catch (error) {
        return handleError(error)
    }
}