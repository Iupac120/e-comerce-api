
const {CustomApiError,UnauthenticatedError} = require('../error')
const {isTokenValid} = require('../utils')
const User = require('../model/User')

// const authenticateUser =async(req,res,next)=>{
//     const auth = req.headers.authorization
//     if(!auth || !auth.startsWith('Bearer')){
//         return next(new CustomApiError('incorrect header'))
//     }
//     const token = auth.split(' ')[1]
//     const decode = isTokenValid(token)
//     next()
// }
const authenticateUser =async(req,res,next)=>{
    const token = req.signedCookies.cookieToken  
    if(!token){
        throw new UnauthenticatedError('invalid token')
    }
    try{
        const {name,userId, role} = isTokenValid(token)
        req.user = {name,userId,role}
        // //console.log(req.user)
        // req.user = await User.findById(userId).select('-password')
        next()
    }catch(err){
        console.log(err)
        throw new UnauthenticatedError('Authentication is invalid')
    }
     
}

module.exports = {authenticateUser}