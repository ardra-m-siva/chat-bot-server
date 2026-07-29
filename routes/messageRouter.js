const express = require('express')
const { sendJson } = require('../middlewares/sendJson')
const { sendMessage, getMessages, unSendMessage } = require('../controllers/messageController')
const router = express.Router()
const upload = require('../middlewares/fileUpload')
const { authenticateToken } = require('../middlewares/auth/authenticateToken')
const { validateRequest } = require('../middlewares/handleError')
const { messageValidator } = require('../middlewares/validators/messageValidator')

router.route('/')
    .post(authenticateToken, upload.single('media'), messageValidator('send'), validateRequest(), async (req, res) => {
        const data = await sendMessage(req, res)
        sendJson(res, data)
    })

    .get(authenticateToken, messageValidator('getMessage'), validateRequest(), async (req, res) => {
        const data = await getMessages(req, res)
        sendJson(res, data)
    })

    // ! check this controller
    .delete(authenticateToken, async (req, res) => {
        const data = await unSendMessage(req, res)
        sendJson(res, data)
    })

module.exports = router