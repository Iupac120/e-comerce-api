const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please provide the name'],
        maxlength:[100,'character cannot be more than 100']
    },
    rating:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
})

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'provide the product'],
        maxlength:[100,'name cannot be more than 100']
    },
    price:{
        type:Number,
        required:[true,'provide the price'],
        default:0
    },
    image:{
        type: String,
        default:'../image/example.jpg'
        
    },
    description:{
        type:String,
        required:[true,'provide the product description'],
        maxlength:[1000,'description cannot be more than 1000 characters']
    },
    category:{
        type:String,
        required:[true,'provide the product description'],
        enum:['office','kitchen','bedroom','electronics']
    },
    company:{
        type:String,
        required:[true,'provide the product description'],
        enum:{
            values:['liddy','marcos','ikea'],
            message:'{VALUE} is not supported'
        }
    },
    color:{
        type:[String],
        required:[true,'provide the price'],
        default:['#e9e9e9']
        
    },
    featured:{
        type:Boolean,
        default:false
        
    },
    freeshipping:{
        type:Boolean,
        default:false  
    },
    
    averageRating:{
        type:Number,
        required:true,
        default: 0,
    },
    numofReviews:{
        type:Number,
        required:true,
        default: 0,
    }, 
    user:{
        type:mongoose.Schema.Types.Object,
        ref:"User",
        required:true
    },
    inventory:{
        type:Number,
        default:15,
        required:true
        
    },
},{timestamps:true, toJSON:{virtuals:true},toObject:{virtuals:true}})

module.exports = mongoose.model('Product', productSchema)