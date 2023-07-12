
const {CustomApiError,UnauthenticatedError} = require('../error')
const {isTokenValid} = require('../utils')
const User = require('../model/User')


// const authenticateUser =async(req,res,next)=>{
//     const token = req.signedCookies.cookieToken  
//     if(!token){
//         throw new UnauthenticatedError('invalid token')
//     }
//     try{
//         const {name,userId, role} = isTokenValid(token)
//         req.user = {name,userId,role}
//         // //console.log(req.user)
//         // req.user = await User.findById(userId).select('-password')
//         next()
//     }catch(err){
//         console.log(err)
//         throw new UnauthenticatedError('Authentication is invalid')
//     }
     
// }

// module.exports = {authenticateUser} 
const jwt = require('jsonwebtoken')

const authenticateUser =async(req,res,next)=>{
    const auth = req.headers.authorization
    if(!auth || !auth.startsWith('Bearer')){
        return next(new Error('incorrect header'))
    }
    const token = auth.split(' ')[1]
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    const {id,isAdmin} = decode
    req.userT = {id,isAdmin}
    next()
}
module.exports = {authenticateUser}