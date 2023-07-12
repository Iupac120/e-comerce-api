
const Order = require('../model/Order')
const {StatusCodes} = require('http-status-codes')


const getAllOrder = async(req,res)=>{
    // const order = await Order.find({}).populate('user','name')
    // res.status(StatusCodes.OK).json({order})
    try{
        const orders = await Order.find()
        res.status(201).json(orders)
    }catch(err){
        res.status(501).json(err)
    } 
}
const createOrder = async(req,res)=>{
    // const {
    //     orderItems,
    //     shippingAddress,
    //     paymentMethod,
    //     itemsPrice,
    //     taxPrice,
    //     shippingPrice,
    //     totalPrice
    // } = req.body
    // if(orderItems && orderItems.length === 0){
    //     throw new Error('order item is empty')
    // }else{
    //     const createOrder = await Order.create({...req.body})
    //     res.status(StatusCodes.OK).json({createOrder})
    // }
   
    const newOrder = new Product(req.body)
    try{
        const savedOrder = await newOrder.save()
        res.status(201).json(savedOrder)
    }catch(err){
        res.status(401).json(err)
    } 
}

const getSingleOrder = async(req,res)=>{
    // const {id} = req.params
    // const order = await Order.findById({_id:id}).populate(
    //     "user",
    //     "name email"
    // )
    // res.status(StatusCodes.OK).json({order})
    try{
        const orders = await Order.find({userId:req.params.userId})
        res.status(201).json(orders)
    }catch(err){
        res.status(501).json(err)
    }
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


const updateOrder = async(req,res)=>{
    const {id} = req.params
    const updateOrder = await Order.findOneAndUpdate({_id:id},req.body,{
        new:true, runValidators:true
    })
    if(!updateOrder){
        throw new Error('Order does not exist')
    }else{
        res.status(StatusCodes.OK).json({updateOrder})
    }
}
const deleteOrder = async(req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("order has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
}

const getOrderStats = async(req,res)=>{
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(new Date.setMonth(lastMonth.getMonth()-1))
    try{
        const income = await Order.aggregate([
            {
                $match:{$createdAt:{$gte:previousMonth}}
            },
            {
                $project:{
                    $month:{$month:"$createdAt"},
                    sales:"amount"
                },  
                
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum:"$sales"}
                }
            }
        ])
        res.ststus(201).json(income)
    }catch(err){
        res.status(501).json(err)
    }
}

module.exports = {
    createOrder,
    getAllOrder,
    getSingleOrder,
    getUserOrder,
    updateOrder,
    deleteOrder
}