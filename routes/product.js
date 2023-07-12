

const express = require('express')
const router = express.Router()

const {getAllProducts,
    createProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
    countPages,
    uploadProductImage
} = require('../controllers/products')
const {authenticateUser} = require('../middleware/authentication')
const {verifyTokenAndIsAdmin} = require('../middleware/isAdminAuth')

router.route('/').get(getAllProducts).post(verifyTokenAndIsAdmin,createProduct)
//router.route('/:id/review').get(authenticateUser,getProductReview)
router.route('/page').get(countPages)
router.route('/uploadImage').post(authenticateUser,uploadProductImage)
router.route('/:id').get(getSingleProduct).patch(verifyTokenAndIsAdmin,updateSingleProduct).delete(authenticateUser,deleteSingleProduct)


module.exports = router