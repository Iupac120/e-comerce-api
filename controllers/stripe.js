const stripe = require('stripe')

const stripeControl = (req,res)=>{
    const stripes = stripe(process.env.STRIPE_KEY)
    stripes.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"usd"
    },(stripesErr,StripesRes)=>{
        if(stripesErr){
            res.status(501).json(stripesErr)
        }else{
            res.status(201).json(StripesRes)
        }
    })
}

module.exports = {stripeControl}