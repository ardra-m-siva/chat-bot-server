const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router()

router.route('/')
    .post(async (req, res) => {
        const data = await registerUser(req, res);
        sendJson(res, data);
    })
    .get((req, res) => {

    })
router.route('/login')
    .post(async (req, res) => {
        const data = await loginUser(req, res)
        sendJson(res, data)
    })

module.exports = router