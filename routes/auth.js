const express = require('express')
const router = express.Router()
const {register,login} = require('../controllers/auth')

router.route('/register').post(register)
router.route('/login').post(login)
//router.route('/logout').get(logout)

module.exports = router