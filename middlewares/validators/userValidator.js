const { body } = require("express-validator")

module.exports.userValidator = (validationType) => {
    switch (validationType) {
        case 'register':
            return [
                body('name')
                    .trim()
                    .notEmpty()
                    .withMessage('Name is required'),

                body('username')
                    .trim()
                    .notEmpty()
                    .withMessage('Username is required'),

                body('email')
                    .trim()
                    .notEmpty()
                    .withMessage('Email is required')
                    .isEmail()
                    .withMessage('Please provide a valid email'),

                body('password')
                    .trim()
                    .notEmpty()
                    .withMessage('Password is required'),
            ]

        case 'login':
            return [
                body('loginId')
                    .trim()
                    .notEmpty()
                    .withMessage('Username or email is required'),

                body('loginPassword')
                    .trim()
                    .notEmpty()
                    .withMessage('Password is required'),
            ]
    }
}