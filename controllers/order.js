
const Order = require('../model/Order')
const {StatusCodes} = require('http-status-codes')
const createOrder = async(req,res)=>{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body
    if(orderItems && orderItems.length === 0){
        throw new Error('order item is empty')
    }else{
        const createOrder = await Order.create({...req.body})
        res.status(StatusCodes.OK).json({createOrder})
    }
   
}

const getSingleOrder = async(req,res)=>{
    const {id} = req.params
    const order = await Order.findById({id}).populate(
        "user",
        "name email"
    )
    res.status(StatusCodes.OK).json({order})
}
// const updatePayedOrder = async(req,res)=>{
//     const {id} = req.params
//     const order = await Order.findById({id})
//     if(order){
//         order.isPaid = true,
//         order.paidAt = Date.now(),
//         order.paymentResult ={
//             id:req.body.id,
//             status:req.body.status,
//             update_time:req.body.update_time,
//             email_address:req.body.email_address
//         }
//         const updatedOrder = await order.save()
//         res.status(StatusCodes.OK).json({updatedOrder})
//     }else{
//         res.status(StatusCodes.EXPECTATION_FAILED)
//         throw new Error('Order not found')
//     }
//     res.status(StatusCodes.OK).json({order})
// }

const getUserOrder = async(req,res)=>{
    const {id} = req.user.userId
    const userOrder = await Order.findOne({user:id})
    if(!userOrder){
        throw new Error('yoh have created an order')
    }else{
        res.status(StatusCodes.OK).json({msg:`You order is ${userOrder}`})
    }
}

const loginOrder = async(req,res)=>{
    const order = await Order.find({user:req.user._id}).sort({_id:-1})
    res.status(StatusCodes.OK).json({order})
}

module.exports = {
    createOrder,
    getSingleOrder,
    getUserOrder,
    loginOrder
}