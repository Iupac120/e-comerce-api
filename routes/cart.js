const express = require('express')
const router = express.Router()
const {authenticateUser} = require('../middleware/authentication')
const {verifyTokenAuthorization} = require('../middleware/verifyTokenAuthorization')
const {verifyTokenAndIsAdmin} = require('../middleware/isAdminAuth')

const {createCart,updateCart,deleteCart,getSingleCart,getAllCart} = require('../controllers/cart')

router.route('/').post(authenticateUser,createCart).get(verifyTokenAndIsAdmin,getAllCart)
router.route('/:id').put(verifyTokenAuthorization,updateCart).delete(verifyTokenAuthorization,deleteCart)
router.route('/find/:userId').get(verifyTokenAuthorization,getSingleCart)


module.exports = router