const {StatusCodes} = require('http-status-codes')
const CustomErrorApi = require('../error/customError')
const errorHandler =(err,req,res,next)=>{
    let customerror = {

        statuscodes: err.statuscodes || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.msg || 'something went wrong'
    }
    if (err instanceof CustomErrorApi){
        res.status(customerror.statuscodes).json({msg:customerror.msg})
    }
        return res.status(500).json({msg:'something went wrong, try again later'})

    
}

module.exports = errorHandler