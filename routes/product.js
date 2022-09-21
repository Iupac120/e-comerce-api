

const express = require('express')
const router = express.Router()

const {getAllProducts,
    createProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
    getProductReview,
    countPages,
    uploadProductImage
} = require('../controllers/products')
const {authenticateUser} = require('../middleware/authentication')

router.route('/').get(authenticateUser,getAllProducts).post(authenticateUser,createProduct)
router.route('/:id/review').get(authenticateUser,getProductReview)
router.route('/page').get(countPages)
router.route('/uploadImage').post(authenticateUser,uploadProductImage)
router.route('/:id').get(authenticateUser,getSingleProduct).patch(authenticateUser,updateSingleProduct).delete(authenticateUser,deleteSingleProduct)
module.exports = router