const express = require('express')
const router = express.Router()
const {getAllUsers,getSingleUser, updateUser,showCurrentUser,updateUserPassword,deleteUser}  = require('../controllers/users')
const {authenticateUser} = require('../middleware/authentication')
const {verifyTokenAuthorization} = require('../middleware/verifyTokenAuthorization')
const {verifyTokenAndIsAdmin} = require('../middleware/isAdminAuth')
 

router.route('/').get(authenticateUser,getAllUsers)
router.route('/:id').delete(verifyTokenAuthorization,deleteUser)
router.route('/showcurrentuser').get(authenticateUser,showCurrentUser)
router.route('/updatepassword').patch(authenticateUser,updateUserPassword)
router.route('/:id').patch(verifyTokenAuthorization,updateUser)

router.route('/:id').get(verifyTokenAndIsAdmin,getSingleUser)


module.exports = router