const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'please provide the name'],
        trim:true,
        maxlength:[100,'character cannot be more than 100']
    },
    rating:{
        type:String,
        required:[true,'please provide a rating'],
        min:1,
        max:5
    },
    comment:{
        type:String,
        required:[true,'please provide review comment']
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Product'
    }
},{timestamps:true})

module.exports = mongoose.model('Review',reviewSchema)