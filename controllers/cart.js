const Cart = require('../model/Cart')

const createCart = async(req,res)=>{
    const newCart = new Cart(req.body)
    try{
        const savedCart = await newCart.save()
        res.status(201).json(savedCart)
    }catch(err){
        res.status(401).json(err)
    }
}

const updateCart = async(req,res)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate({_id:req.params.id},req.body,{
            new:true, runValidators:true
        })
        res.status(201).json(updatedCart)
    }catch(err){
        res.status(500).json(err)
    }
}

const deleteCart = async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("cart has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
}


const getSingleCart = async(req,res)=>{
    try{
        const cart = await Cart.findOne({userId:req.params.userId})
        res.status(201).json(cart)
    }catch(err){
        res.status(501).json(err)
    }
}

const getAllCart = async(req,res)=>{
    try{
        const cart = await Cart.find()
        res.status(201).json(cart)
    }catch(err){
        res.status(501).json(err)
    }
}


module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getSingleCart,
    getAllCart
}