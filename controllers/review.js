
const { StatusCodes } = require('http-status-codes')
const Review = require('../model/Review')

const createReview = async(req,res)=>{
    req.body.user =req.user.userId
    //req.body.product = req.product
    const review = await Review.create(req.body)
    res.status(StatusCodes.OK).json({review})
}
const getAllReview = async(req,res)=>{
    const getReview = await Review.find({})
    res.status(StatusCodes.OK).json({getReview})

}
const getSingleReview = async(req,res)=>{
    const {id} = req.params
    const reviewId = await Review.findOne({_id:id})
    res.status(StatusCodes.OK).json({reviewId})
}
const updateReview = async(req,res)=>{
    const {id} = req.params
    const reviewId = await Review.findOneAndUpdate({_id:id},req.body,{
        new:true, runValidators:true
    })
    res.status(StatusCodes.OK).json({msg:'review updated successfully'})
}

const DeleteReview = async(req,res)=>{
    const {id} = req.params
    const reviewId = await Review.findOneAndDelete({_id:id})
    res.status(StatusCodes.OK).json({msg:'review deleted'})
}

const getProductReview = async(req,res)=>{
    const {comment,rating} = req.body
    const product = await Review.findById(req.params.id)
    
        const review = {
            name:req.user.name,
            rating: Number(rating),
            comment:comment,
            user:req.user._id


        }
    if(product){   
        product.push(review)
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




module.exports = {
    createReview,
    getAllReview,
    getSingleReview,
    updateReview,
    DeleteReview,
    getProductReview
}