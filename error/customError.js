const {StatusCodes} = require('http-status-codes')

class CustomErrorApi extends Error{
    constructor(message){
        super(message)
    }
}

module.exports = CustomErrorApi