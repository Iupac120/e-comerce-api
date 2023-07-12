const express = require('express')
const router = express.Router()
const {createOrder,getAllOrder,getSingleOrder,getUserOrder,updateOrder,deleteOrder} = require('../controllers/order')
const {authenticateUser} = require('../middleware/authentication')
const {verifyTokenAndIsAdmin} = require('../middleware/isAdminAuth')
const {verifyTokenAuthorization} = require('../middleware/verifyTokenAuthorization')

router.route('/').post(authenticateUser,createOrder)
router.route('/').get(verifyTokenAndIsAdmin,getAllOrder)

//router.route('/:id/pay').put(authenticateUser,updatePayedOrder)
router.route('/showAllMyOrder').get(authenticateUser,getUserOrder)
router.route('/:id').get(verifyTokenAndIsAdmin,updateOrder)
router.route('/:id').delete(verifyTokenAndIsAdmin,deleteOrder)
router.route('/find/:userId').get(verifyTokenAuthorization,getSingleOrder)




module.exports = router