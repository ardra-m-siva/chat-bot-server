const express = require('express');
const { registerUser, loginUser, getUserList } = require('../controllers/userController');
const { sendJson } = require('../middlewares/sendJson');
const { authenticateToken } = require('../middlewares/auth/authenticateToken');
const router = express.Router()

router.route('/register')
    .post(async (req, res) => {
        const data = await registerUser(req, res);
        sendJson(res, data);
    })
    .get((req, res) => {

    })
router.route('/login')
    .post(async (req, res) => {
        const data = await loginUser(req, res);
        sendJson(res, data)
    })
router.route('/')
    .get(authenticateToken, async (req, res) => {
        const data = await getUserList(req, res);
        sendJson(res, data)
    })

module.exports = router