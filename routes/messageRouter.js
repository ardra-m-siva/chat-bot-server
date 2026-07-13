const express = require('express')
const { sendJson } = require('../middlewares/sendJson')
const { sendMessage } = require('../controllers/messageController')
const router = express.Router()

router.route('/')
    .post(async (req, res) => {
        const data = sendMessage(req, res)
        sendJson(res, data)
    })

module.exports = router