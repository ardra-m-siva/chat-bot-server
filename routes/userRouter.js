const express = require('express');
const { addUser } = require('../controllers/userController');
const router = express.Router()

router.route('/')
    .post(async (req, res) => {
        const data = await addUser(req, res);
        // sendJson(res, data);
    })
    .get((req, res) => {

    })   

module.exports = router