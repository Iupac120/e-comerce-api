
const{CustomApiError} = require('../error')
const {StatusCodes} = require('http-status-codes')
const Product = require('../model/Product')
const User = require('../model/User')

const getAllProducts = async (req,res)=>{
    const product = await Product.find({user:req.user.userId})
    .sort({name:1,price:1,description:1})
    .select({name:1,price:1,description:1}) //jobs associated with the user i.e createdBy
    res.status(StatusCodes.OK).json(product)
}
const createProduct = async(req,res,next)=>{
    req.body.user = req.user.userId
    const product = await Product.create({...req.body})
   res.status(StatusCodes.CREATED).json({product})

}

const getSingleProduct = async(req,res)=>{
    const {user:{userId},params:{id}} = req
    const product = await Product.findOne({_id:id,user:userId})
    .select({name:1,price:1,description:1})
    .populate('reviews')
    if(!product){
        throw new CustomApiError('No product with id')
    }
    res.status(StatusCodes.OK).json({product})
}

const updateSingleProduct = async(req,res)=>{
    const {user:{userId},params:{id}} = req
    const updateProduct = await Product.findOneAndUpdate({_id:id,user:userId},req.body,{
        new:true,runValidators:true
    })
    res.status(StatusCodes.ACCEPTED).json({updateProduct})
}
const deleteSingleProduct = async(req,res)=>{
    const {user:{userId},params:{id}} = req
    const deleteProduct = await Product.findOneAndDelete({_id:id,createdBy:userId})
    res.status(StatusCodes.GONE).json({msg:'Product has been deleted'})
}

const getProductReview = async(req,res)=>{
    const {comment,rating} = req.body
    const product = await Product.findById(req.params.id)
    if(product){
        const alreadyExist = product.reviews.find((r)=>{
            r.user.toString() === req.user._id.toString()
        })
        if(alreadyExist){
            res.status(StatusCodes.FORBIDDEN)
            throw new Error('product already reviewed')
        }
        const review = {
            name:req.user.name,
            rating: Number(rating),
            comment:comment,
            user:req.user._id

        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((initVal,curItem)=>{
            return curItem.rating + initVal
        },0)/product.reviews.length
        await product.save()
        res.status(StatusCodes.ACCEPTED).json({msg:"Review added"})
    }else{
        res.status(StatusCodes.NOT_FOUND)
        throw new Error('Product not found')
    }
    console.log('result',product)
}

const countPages = async(req,res)=>{
    const pageSize = 3
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword
    ?{
        name:{
            $regex: req.query.keyword,
            $options:"i"
        }
    }
    :{}
    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1)).sort({_id:-1})
    res.status(StatusCodes.OK).json({products,page,pages:Math.ceil(count/pageSize)})
}
const uploadProductImage = async(req,res)=>{
    if(!req.files){
        throw new Error('No file to upload')
    }
    const productImage = req.files.image;
    if(productImage.mimeType.startsWith('image')){
        throw new Error('please uploade image')
    }
    const maxSize = 1024*1024
    const imagePath = path.join(__dirname,'../image'+`${productImage.name}`)
    await productImage.mv(imagePath)
    res.status(StatusCodes.OK).json({image:`../image/${productImage.name}`})
}

 
module.exports = {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
    getProductReview,
    countPages,
    uploadProductImage
}