const express = require('express')
const router = express.Router()
const {createOrder,getAllOrder,getSingleOrder,getUserOrder,updateOrder} = require('../controllers/order')
const {authenticateUser} = require('../middleware/authentication')

router.route('/').post(authenticateUser,createOrder)
router.route('/').get(authenticateUser,getAllOrder)

//router.route('/:id/pay').put(authenticateUser,updatePayedOrder)
router.route('/showAllMyOrder').get(authenticateUser,getUserOrder)
router.route('/:id').get(authenticateUser,updateOrder)
router.route('/:id').get(authenticateUser,getSingleOrder)




module.exports = router