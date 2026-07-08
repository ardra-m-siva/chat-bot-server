const jwt = require("jsonwebtoken")
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
        const { loginId, password } = req.body
        const condition = {
            $or: [{ username: loginId }, { email: loginId }]
        }
        const userDetails = await userModel.findOne(condition).select('+password')
        const isMatch = await bcrypt.compare(password, userDetails.password)
        if (!isMatch) {
            return { code: 401, message: "Invalid credentials" }
        }
        const { _id, name, username, email } = userDetails
        const token = await jwt.sign({ id: _id, name, username, email }, process.env.SECRET_KEY, { expiresIn: '24h' })
        return { data: { token, }, message: 'login successfull' }
    } catch (error) {
        return handleError(error)
    }
}