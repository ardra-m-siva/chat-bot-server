const { default: mongoose } = require("mongoose");

module.exports.handleError = (error) => {
    // if(error instanceof mongoose.Error.ValidationError){

    //     console.log(error);
    // }
    console.log(error);
    
    return {
        code: error?.code ?? 500,
        message: error.message ?? 'Internal Sever Error'
    }
}