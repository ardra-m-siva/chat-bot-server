module.exports.sendJson = (res, { code = 200, message, data, success = false }) => {
    console.log(code, message, data, success    )
    if (!isValidHttpStatusCode(code)) {
        code = 500
    }
    return res.status(code).json({ data, message, success })
}

function isValidHttpStatusCode(code) {
    return Number.isInteger(code) && (code >= 100 && code <= 599)
}