const mongoose = require('mongoose')


// const productSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:[true,'provide the product'],
//         maxlength:[100,'name cannot be more than 100']
//     },
//     price:{
//         type:Number,
//         required:[true,'provide the price'],
//         default:0
//     },
//     image:{
//         data:Buffer,
//         type: String,
//         default:'../image/example.jpg'
        
//     },
//     description:{
//         type:String,
//         required:[true,'provide the product description'],
//         maxlength:[1000,'description cannot be more than 1000 characters']
//     },
//     category:{
//         type:Array,
    
//     },
//     company:{
//         type:String,
//         required:[true,'provide the product description'],
//         enum:{
//             values:['liddy','marcos','ikea'],
//             message:'{VALUE} is not supported'
//         }
//     },
//     color:{
//         type:Array,
//         required:[true,'provide the price'],
//         default:['#e9e9e9']
        
//     },
//     size:{
//         type:Array,
//         required:[true,'provide the price'],
//         default:['#e9e9e9']
        
//     },
//     inStock:{
//         type:Boolean,
//         required:[true,'provide the price'],
//         default:true
        
//     },
//     featured:{
//         type:Boolean,
//         default:false
        
//     },
//     freeshipping:{
//         type:Boolean,
//         default:false  
//     },
    
//     averageRating:{
//         type:Number,
//         required:true,
//         default: 0,
//     },
//     numofReviews:{
//         type:Number,
//         required:true,
//         default: 0,
//     }, 
//     user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User",
//         required:true
//     },
//     inventory:{
//         type:Number,
//         default:15,
//         required:true
        
//     },
// },{timestamps:true, toJSON:{virtuals:true},toObject:{virtuals:true}})
// productSchema.virtual('reviews',{
//     ref:'Review',
//     localField:'_id',
//     foreignField:'product',
//     justOne:false
// })
// productSchema.pre('remove',async function(){
//     this.model('Review').deleteMany({product:this._id})
// })
// module.exports = mongoose.model('Product', productSchema)


const ProductSchema = new mongoose.Schema({
    title:{type:String,required:true, unique:true},
    desc:{type:String,required:true},
    img:{type:String,required:true},
    categories:{type:Array},
    size:{type:Array},
    color:{type:Array},
    price:{type:String,required:true},
    inStock:{type:Boolean,default:true}
})

module.exports = mongoose.model('Product',ProductSchema)