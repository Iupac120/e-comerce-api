

const {StatusCodes} = require('http-status-codes')
const User = require('../model/User')
const {NotfoundError, BadquestError} = require('../error')
const { createToken, attachCookieToResponse } = require('../utils')


// const getAllUsers =async(req,res)=>{
//     const alluser = await  User.find({role:'user'}).select('-passsword')
//     res.status(StatusCodes.OK).json({alluser})
//     console.log('users')
// }

// const getSingleUser = async(req,res)=>{
//     const userId = req.params.id
//     const user = await User.findOne({_id:userId})
//     if(!user){
//         throw new NotfoundError('No user with id')
//     }
//     res.status(StatusCodes.OK).json({user})
// }
// const updateUser = async (req,res)=>{
//     const {name,email,userId} = req.body
//     console.log(req.user)
//     if(!name || !email){
//         throw new NotfoundError('No user with id')
//     }
//     const user = await User.findOne({_id:req.user.userId})

//     user.email = email
//     user.name = name
    
//     await user.save()
//     //update user token and cookie

//     const userToken = createToken(user)
//     attachCookieToResponse({res,user:userToken})
    
//     res.status(StatusCodes.OK).json({msg:` success ${user}`})
// }

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

const updateUser = async(req,res)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate({_id:req.params.id},req.body,{
            new:true, runValidators:true
        })
        res.status(201).json(updatedUser)
    }catch(err){
        res.status(500).json(err)
    }
}

const deleteUser = async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
}

const getSingleUser = async(req,res)=>{
    try{
    const user = await User.findById(req.params.id)
    const {password,...others} = user._doc
    res.status(201).json({others})
    }catch(err){
        res.status(500).json(err)
    }
}
const getAllUsers =async(req,res)=>{
    const query = req.query.new
    try{
        const users = query? await User.find({}).sort({_id:-1}).limit(5) : await User.find({})
        res.status(201).json(users)
    }catch(err){
        res.status(500).json(err)
    }
}

const getUserStats = async(req,res)=>{
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1))
    try{
        const data = await User.aggregate([
            {$match:{createdAt:{$gte:lastYear}}},
            {
                $project:{
                    month:{$month: "$createdAt"}
                }
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum:1}
                }
            }
        ])
        res.status(201).json(data)
    }catch(err){
        res.status(500).json(err)
    }
}

module.exports = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    showCurrentUser,
    updateUserPassword
}