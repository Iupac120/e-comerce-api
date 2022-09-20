const {StatusCodes} = require('http-status-codes')
const CustomErrorApi = require('./customError')

class NotfoundError extends CustomErrorApi{
    constructor(msg){
        super(msg)
        this.statusCodes = StatusCodes.NOT_FOUND
    }
}

module.exports = NotfoundError
