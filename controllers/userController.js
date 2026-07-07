const { handleError } = require("../middlewares/handleError")
const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')

module.exports.registerUser = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email })
        if (existingUser) return { code: 400, message: 'Email already exists' }
        const generatedSalt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, generatedSalt)
        const newUser = new userModel(req.body).save()
        return { data: newUser, message: 'User registered successfully' }

    } catch (error) {
        return handleError(error)
    }
}

module.exports.loginUser = async (req, res) => {
    try {

    } catch (error) {

    }
}