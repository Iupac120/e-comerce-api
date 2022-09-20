const User = require('../model/User')
const {StatusCodes} = require('http-status-codes')
const {BadquestError,UnauthenticatedError} = require('../error/')
const {createToken, attachCookieToResponse} = require('../utils')



const register = async(req,res)=>{
    const {name,email,password} = req.body
    const emailAlreadyExist = await User.findOne({email})
    if(emailAlreadyExist){
        throw new BadquestError('Your email already exist')
    }
    const user = await User.create({name,email,password})
    const userToken = createToken(user)
    attachCookieToResponse({res,user:userToken})
    res.status(StatusCodes.CREATED).json({msg:`You have registered ${userToken}`})
}

const login = async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        throw new BadquestError('Please enter your login correctly')
    }
    const userEmail = await User.findOne({email})
    console.log('one')
    if(!userEmail){
        throw new UnauthenticatedError('incorrect email')
    }
    const isUserPassword = await userEmail.comparePassword(password)
    console.log('two')
    if(!isUserPassword){
        throw new UnauthenticatedError('incorrect password')
    }
    //const userToken = res.staus(StatusCodes.OK).json({createToken(User)})
    const userToken = createToken(userEmail) ///user destruction name:user.name, userId:user._id,role:user.role
    attachCookieToResponse({res,user:userToken})//cookies is attach to the user
    res.status(StatusCodes.ACCEPTED).json({msg:`welcome ${User.name}`,userToken})

}

const logout = async(req,res)=>{
    console.log(req.user)
    res.cookie('cookieToken','logout',{
        httpOnly: true,
        expiresIn: new Date(Date.now() + 1000)
    })
    
    res.status(StatusCodes.OK).json({msg:`You logged out`})
}

module.exports = {
    register,
    login,
    logout
}