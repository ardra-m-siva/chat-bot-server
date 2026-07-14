const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('../helpers/cloudinaryConfig')

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
        folder: "chat-app",
        resource_type: 'auto'
    })
})

const fileUpload = multer({ storage })

module.exports = fileUpload;
