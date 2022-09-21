
const { StatusCodes } = require('http-status-codes')
const Review = require('../model/Review')

const createReview = async(req,res)=>{
    req.body.user =req.user.userId
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



module.exports = {
    createReview,
    getAllReview,
    getSingleReview,
    updateReview,
    DeleteReview
}