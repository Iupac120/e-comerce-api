// const User = require('../model/User')
// const {StatusCodes} = require('http-status-codes')
// const {BadquestError,UnauthenticatedError} = require('../error/')
// const {createToken, attachCookieToResponse} = require('../utils')



// // const register = async(req,res)=>{
// //     const {name,email,password} = req.body
// //     const emailAlreadyExist = await User.findOne({email})
// //     if(emailAlreadyExist){
// //         throw new BadquestError('Your email already exist')
// //     }
// //     const user = await User.create({name,email,password})
// //     const userToken = createToken(user)
// //     attachCookieToResponse({res,user:userToken})
// //     res.status(StatusCodes.CREATED).json({msg:`You have registered ${userToken}`})
// // }

// // const login = async(req,res)=>{
// //     const {email,password} = req.body
// //     if(!email || !password){
// //         throw new BadquestError('Please enter your login correctly')
// //     }
// //     const userEmail = await User.findOne({email})
// //     console.log('one')
// //     if(!userEmail){
// //         throw new UnauthenticatedError('incorrect email')
// //     }
// //     const isUserPassword = await userEmail.comparePassword(password)
// //     console.log('two')
// //     if(!isUserPassword){
// //         throw new UnauthenticatedError('incorrect password')
// //     }
// //     //const userToken = res.staus(StatusCodes.OK).json({createToken(User)})
// //     const userToken = createToken(userEmail) ///user destruction name:user.name, userId:user._id,role:user.role
// //     attachCookieToResponse({res,user:userToken})//cookies is attach to the user
// //     res.status(StatusCodes.ACCEPTED).json({msg:`welcome ${User.name}`,userToken})

// // }

// // const logout = async(req,res)=>{
// //     console.log(req.user)
// //     res.cookie('cookieToken','logout',{
// //         httpOnly: true,
// //         expiresIn: new Date(Date.now() + 1000)
// //     })
    
// //     res.status(StatusCodes.OK).json({msg:`You logged out`})
// // }

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../model/User')


const register=async(req,res)=>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:await bcrypt.hash(req.body.password,10),

    })
    try{
        const SavedUser = await newUser.save()
        res.status(200).json({SavedUser})
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

const login=async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        !user && res.status(401).json('email does not exist')
        const userpassword = await bcrypt.compare(req.body.password,user.password)
        if(!userpassword){
            res.status(401).json("Wrong password")
        }

        const accessToken = jwt.sign({id:user._id,isAdmin:user.isAdmin },process.env.JWT_SECRET,{expiresIn:'3d'})
        const {password,...others} = user._doc
        res.status(200).json({...others,accessToken})
    }catch(err){
        res.status(500).json(err)
    }
}

module.exports = {
    register,
    login,
    //logout
}