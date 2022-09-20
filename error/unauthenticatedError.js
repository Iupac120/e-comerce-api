const {StatusCodes} = require('http-status-codes')
const CustomErrorApi = require('./customError')

class UnauthenticatedError extends CustomErrorApi{
    constructor(msg){
        super(msg)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthenticatedError