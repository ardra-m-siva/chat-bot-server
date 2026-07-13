const { handleError } = require("../handleError")
const jwt = require('jsonwebtoken')

module.exports.authenticateToken = (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (!token) {
            res.status(401).json({ message: "Token not provided!" })
        }
        if (token && token.startsWith("Bearer ")) {
            token = token?.trim().split(" ")[1]
        } else {
            res.status(401).json({ message: "Not a valid token" })
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) return { code: 403, message: "Failed to authenticate token!" }
            req.id = decoded.id
            next()
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}