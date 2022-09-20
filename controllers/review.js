
const { StatusCodes } = require('http-status-codes')
const Review = require('../model/Review')
const createReview = async(req,res)=>{
    const review = await Review.create(req.body)
    res.status(StatusCodes.OK).json({review})
}


module.exports = {
    createReview
}