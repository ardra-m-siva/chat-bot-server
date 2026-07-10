const express = require('express')
const { sendJson } = require('../middlewares/sendJson')
const { createOrGetChat, allChats } = require('../controllers/chatController')
const { authenticateToken } = require('../middlewares/auth/authenticateToken')
const router = express.Router()

router.route('/')
    .get(authenticateToken, async (req, res) => {
        const data = await allChats(req, res);
        sendJson(res, data)
    })
    .post(authenticateToken, async (req, res) => {
        const data = await createOrGetChat(req, res)
        sendJson(res, data)
    })

module.exports = router;