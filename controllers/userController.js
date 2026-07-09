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
        const newUser = await userModel(req.body).save()
        return { data: newUser, message: 'User registered successfully', success: true }
    } catch (error) {
        return handleError(error)
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        const { loginId, loginPassword } = req.body
        const userDetails = await userModel.findOne({ $or: [{ username: loginId }, { email: loginId }] })
            .select('+password')
            .lean();
        if (!userDetails) return { code: 404, message: "Invalid credentials" }
        const isMatch = await bcrypt.compare(loginPassword, userDetails.password)
        if (!isMatch) {
            return { code: 401, message: "Invalid password" }
        }
        const { _id, name, username, email, password, ...userWithoutPassword } = userDetails
        const payload = { id: _id, name, username, email }
        const token = await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' })
        return { data: { token, user: { ...payload, ...userWithoutPassword } }, message: 'login successfull', success: true }
    } catch (error) {
        return handleError(error)
    }
}

module.exports.getUserList = async (req, res) => {
    try {
        const { searchUser } = req.query
        const userList = await userModel.find({ username: { $regex: searchUser, $options: 'i' } })
        return { message: 'User list fetched successfully', data: userList, success: true }
    } catch (error) {
        return handleError(error)
    }
}