const { rawListeners } = require('../model/Product')
const {authenticateUser} = require('./authentication')


const verifyTokenAuthorization = async(req,res,next)=>{
    authenticateUser(req,res,()=>{
        if(req.userT.id === req.params.id || req.userT.isAdmin ){
            next()
        }else{
            res.status(403).json('authorised')
        }
    })
}

module.exports = {verifyTokenAuthorization}