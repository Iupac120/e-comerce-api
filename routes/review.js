const express = require('express')
const router = express.Router()

const {createReview} = require('../controllers/review')
const {authenticateUser} = require('../middleware/authentication')

router.route('/').post(authenticateUser,createReview)

module.exports = router