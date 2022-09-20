const express = require('express')
const router = express.Router()
const {getAllUsers,getSingleUser, updateUser,showCurrentUser,updateUserPassword}  = require('../controllers/users')
const {authenticateUser} = require('../middleware/authentication')
 

router.route('/').get(authenticateUser,getAllUsers)

router.route('/updateuser').patch(authenticateUser,updateUser)
router.route('/showcurrentuser').get(authenticateUser,showCurrentUser)
router.route('/updatepassword').patch(authenticateUser,updateUserPassword)
router.route('/:id').get(authenticateUser,getSingleUser)


module.exports = router