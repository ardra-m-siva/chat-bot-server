const { validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");
const { sendJson } = require("./sendJson");

module.exports.handleError = (error) => {
    // if (error instanceof mongoose.Error.ValidationError) {
    //     const keys = Object.keys(error.errors);
    //     error.message = error.errors[keys[keys.length - 1]].message;
    //     return {
    //         code: 400,
    //         message: error.message,
    //     }
    // }
    console.log(error);

    return {
        code: error?.code ?? 500,
        message: error.message ?? 'Internal Sever Error'
    }
}

module.exports.validateRequest = () => (req, res, next) => {
    const error = validationResult(req)
    console.log(error);
    if (!error.isEmpty()) {
        return sendJson(res, { code: 400, message: error.errors[0].msg })
    }
    next()
}