const {StatusCodes} = require('http-status-codes')
const CustomErrorApi = require('./customError')

class BadquestError extends CustomErrorApi{
    constructor(msg){
        super(msg)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}
module.exports = BadquestError