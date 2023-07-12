const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

// const userSchema = new mongoose.Schema({
//    name:{
//     type: String,
//     required: [true,'please provide a name'],
//     minlegth:2,
//     maxlength: 50
//    } ,
//    email:{
//     type: String,
//     required: [true,'please provide an email'],
    
//    },
//    password:{
//     type: String,
//     required: [true,'please provide a passsword'],
//     minlegth: 6
//    },
//    role:{
//     type: String,
//     enum:['admin','user'],
//     required:true,
//     default: 'user'
//    }

// },{timestamps: true})


// userSchema.pre('save', async function(){
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
// })

// userSchema.methods.comparePassword = async function(userPassword){
//     const isMatch = await bcrypt.compare(userPassword,this.password)
//     return isMatch
// }


// module.exports = mongoose.model('User', userSchema)

const userSchema = new mongoose.Schema({
    username:{type:String,required:true, unique:true},
    email:{type:String,required:true, unique:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false},
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)