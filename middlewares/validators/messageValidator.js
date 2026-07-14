const { body } = require("express-validator")

module.exports.messageValidator = (validationType) => {
    switch (validationType) {
        case 'send':
            return [
                body('chatId')
                    .notEmpty()
                    .withMessage("Chat ID is required")
                    .isMongoId()
                    .withMessage("Invalid Chat ID"),

                body('messageType')
                    .optional()
                    .isIn(["text", "image", "video", "file"])
                    .withMessage("Invalid message type"),
            ]
    }
}