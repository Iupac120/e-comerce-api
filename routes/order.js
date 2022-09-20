const express = require('express')
const router = express.Router()
const {createOrder,getSingleOrder,updatePayedOrder,loginOrder} = require('../controllers/order')
const {authenticateUser} = require('../middleware/authentication')

router.route('/').post(authenticateUser,createOrder)
router.route('/:id').get(authenticateUser,getSingleOrder)
router.route('/:id/pay').put(authenticateUser,updatePayedOrder)
router.route('/').get(authenticateUser,loginOrder)



module.export = router