const { handleError } = require("../middlewares/handleError")

module.exports.sendMessage = async (req, res) => {
    try {
        const senderId = req.id
        const { chatId, message } = req.body
    } catch (error) {
        return handleError(error);
    }
}