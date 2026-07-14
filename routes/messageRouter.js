const express = require('express')
const { sendJson } = require('../middlewares/sendJson')
const { sendMessage, getMessages } = require('../controllers/messageController')
const router = express.Router()
const upload = require('../middlewares/fileUpload')
const { authenticateToken } = require('../middlewares/auth/authenticateToken')

router.route('/')
    .post(authenticateToken, upload.single('media'), async (req, res) => {
        const data = await sendMessage(req, res)
        sendJson(res, data)
    })

    .get(authenticateToken, async (req, res) => {
        const data = await getMessages(req, res)
        sendJson(res, data)
    })

module.exports = router