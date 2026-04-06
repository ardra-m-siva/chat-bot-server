const { handleError } = require("../middlewares/handleError")
const userModel = require("../models/userModel")

module.exports.addUser=async (req,res)=>{
    try {
        const newUser= new userModel(req.body).save()
        console.log(newUser);
        
    } catch (error) {
        return handleError(error)
    }
}