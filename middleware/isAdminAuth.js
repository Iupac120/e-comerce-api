const {authenticateUser} = require('./authentication')

const verifyTokenAndIsAdmin = (req,res,next)=>{
    authenticateUser(req,res,()=>{
        if(req.userT.isAdmin){
            next()
        }else{
            throw new Error('You are not admin')
        }
    })
}

module.exports = {verifyTokenAndIsAdmin}