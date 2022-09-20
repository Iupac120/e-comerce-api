

const {StatusCodes} = require('http-status-codes')
const User = require('../model/User')
const {NotfoundError, BadquestError} = require('../error')
const { createToken, attachCookieToResponse } = require('../utils')


const getAllUsers =async(req,res)=>{
    const alluser = await  User.find({role:'user'}).select('-passsword')
    res.status(StatusCodes.OK).json({alluser})
    console.log('users')
}

const getSingleUser = async(req,res)=>{
    const userId = req.params.id
    const user = await User.findOne({_id:userId})
    if(!user){
        throw new NotfoundError('No user with id')
    }
    res.status(StatusCodes.OK).json({user})
}
const updateUser = async (req,res)=>{
    const {name,email,userId} = req.body
    console.log(req.user)
    if(!name || !email){
        throw new NotfoundError('No user with id')
    }
    const user = await User.findOne({_id:req.user.userId})

    user.email = email
    user.name = name
    
    await user.save()
    //update user token and cookie

    const userToken = createToken(user)
    attachCookieToResponse({res,user:userToken})
    
    res.status(StatusCodes.OK).json({msg:` success ${user}`})
}

const showCurrentUser = async(req,res,next)=>{
    console.log('user')
    res.status(StatusCodes.OK).json({user:req.user.name})
}

const updateUserPassword = async(req,res,next)=>{
    const {oldPassword, newPassword} = req.body
    if(!oldPassword || !newPassword){
        throw new BadquestError('provide the password')
    }
    const user = await User.findOne({_id:req.user.userId})
    const isPasswordCorrect = user.comparePassword(oldPassword)
    if(!isPasswordCorrect){
        throw new BadquestError('incorrect password')
    }
    user.password = newPassword
    await user.save()
    res.status(StatusCodes.OK).json({msg:'success! password has been updated'})
}

module.exports = {
    getAllUsers,
    getSingleUser,
    updateUser,
    showCurrentUser,
    updateUserPassword
}