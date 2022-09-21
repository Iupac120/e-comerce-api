const express = require('express')
const router = express.Router()

const {createReview,getAllReview,getSingleReview,updateReview,DeleteReview} = require('../controllers/review')
const {authenticateUser} = require('../middleware/authentication')

router.route('/').post(authenticateUser,createReview).get(authenticateUser,getAllReview)
router.route('/:id')
.get(authenticateUser,getSingleReview)
.patch(authenticateUser,updateReview)
.delete(authenticateUser,DeleteReview)

module.exports = router