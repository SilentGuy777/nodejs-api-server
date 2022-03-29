/*
    Author: Premkumar
    Description: General model structure for response object.
*/

class ResponseModel{
    constructor (code, message, errors, isSuccess){
        this.code = code;
        this.message = message;
        this.errors = errors;
        this.isSuccess = isSuccess;
    }

    getResponseData(){
        return {
            code: this.code,
            message: this.message,
            errors: this.errors,
            isSuccess: this.isSuccess
        };
    }
}

module.exports = ResponseModel;