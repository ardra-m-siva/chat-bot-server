const { handleError } = require("../middlewares/handleError");
const chatModel = require("../models/chatModel");
const userModel = require("../models/userModel");

module.exports.allChats = async (req, res) => {
    try {
        const { id } = req;
        const chatList = await chatModel.find({ participants: id }).populate({
            path: "participants",
            match: { _id: { $ne: id } },
            select: "name username avatar"
        });
        return { data: chatList, message: 'Chat fetched successfully.', success: true }
    } catch (error) {
        return handleError(error)
    }
}
module.exports.createOrGetChat = async (req, res) => {
    try {
        const senderId = req.id;
        const { receiverId } = req.query;
        const existingUser = await userModel.findById(receiverId);
        if (!existingUser) {
            return { code: 404, message: 'User Not Found!' }
        }
        const existingChat = await chatModel.findOne({
            participants: { $all: [senderId, receiverId] },
            $expr: { $eq: [{ $size: '$participants' }, 2] }
        })
        if (existingChat) {
            return { data: existingChat, message: "Existing chat fetched successfully", success: true }
        }
        const newChat = await chatModel({ participants: [senderId, receiverId] }).save()
        return { data: newChat, message: 'New chat created succesfully.', success: true }
    } catch (error) {
        return handleError(error)
    }
}
