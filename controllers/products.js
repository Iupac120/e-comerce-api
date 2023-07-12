
const{CustomApiError} = require('../error')
const {StatusCodes} = require('http-status-codes')
const Product = require('../model/Product')
const path = require('path')
const multer = require('multer')
const imgPath = path.join(__dirname,'..','uploads')

const Storage = multer.diskStorage({
    destination:imgPath,
    filename: function (req,file,callback){
        callback(null,new Date().toISOString()+ file.originalname)
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image.jpg' || file.mimetype === 'image/png'){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

const upload = multer({
    storage:Storage,
    limits:{fileSize:1024*1024*5},
    fileFilter:fileFilter
}).single('productImage')


const getAllProducts = async (req,res)=>{
    const  newQuery = req.query.new;
    const categoryQuery = req.query.category;
    
    try{
        let product;
        if(newQuery){
            product = await Product.find({}).sort({createdAt:"-1"}).limit(5)
        }else if(categoryQuery){
            product = await Product.find({
                category:{
                    $in:[categoryQuery]
                }
            })
        }else{
            product = await Product.find({user:req.user.userId})
            .sort({name:1,price:1,description:1})
            .select({name:1,price:1,description:1}) //jobs associated with the user i.e createdBy
        }
        res.status(StatusCodes.OK).json(product)
        
    }catch(err){
        res.status(StatusCodes.BAD_REQUEST).json(err)
    }
    
}
const createProduct = async(req,res,next)=>{
//     req.body.user = req.user.userId
//     const product = await Product.create({...req.body})
//    res.status(StatusCodes.CREATED).json({product})
    const newProduct = new Product(req.body)
try{
    const savedProduct = await newProduct.save()
    //console.log(savedProduct)
    res.status(201).json(savedProduct)
}catch(err){ 
    res.status(401).json(err)
}

}

const getSingleProduct = async(req,res)=>{
    // const {user:{userId},params:{id}} = req
    // const product = await Product.findById({_id:id,user:userId})
    // .select({name:1,price:1,description:1})
    
    // if(!product){
    //     throw new CustomApiError('No product with id')
    // }
    // res.status(StatusCodes.OK).json({product})
    try{
        const product = await Product.findById(req.params.id)
        res.status(201).json(product)
        }catch(err){
            res.status(500).json(err)
        }
}

const updateSingleProduct = async(req,res)=>{
    // const {user:{userId},params:{id}} = req
    // const updateProduct = await Product.findOneAndUpdate({_id:id,user:userId},req.body,{
    //     new:true,runValidators:true
    // })
    // res.status(StatusCodes.ACCEPTED).json({updateProduct})
    try{
        const updateProduct = await Product.findByIdAndUpdate({_id:req.params.id},req.body,{
            new:true, runValidators:true
        })
        res.status(201).json(updateProduct)
    }catch(err){
        res.status(500).json(err)
    }
}
const deleteSingleProduct = async(req,res)=>{
    // const {user:{userId},params:{id}} = req
    // const deleteProduct = await Product.findOneAndDelete({_id:id,createdBy:userId})
    // res.status(StatusCodes.GONE).json({msg:'Product has been deleted'})
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("product has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
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
// const uploadProductImage = async(req,res)=>{
//     if(!req.files){
//         throw new Error('No file to upload')
//     }
//     const productImage = req.files.image;
//     if(productImage.mimeType.startsWith('image')){
//         throw new Error('please uploade image')
//     }
//     const maxSize = 1024*1024
//     const imagePath = path.join(__dirname,'../image'+`${productImage.name}`)
//     await productImage.mv(imagePath)
//     res.status(StatusCodes.OK).json({image:`../image/${productImage.name}`})
// }
const uploadProductImage = async(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }else{
            const productImage = new Product({...req.body})
            productImage.save().then(()=>{
                res.send('successfully uploaded')
            }).catch((err)=>{
                console.log(err)
            })
        }
        
    })
}
 
module.exports = {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
    countPages,
    uploadProductImage
}