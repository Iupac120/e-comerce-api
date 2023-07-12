const express = require('express')
const router = express.Router()
const {stripeControl} = require('../controllers/stripe')


router.route('/payment').post(stripeControl)

module.exports = router