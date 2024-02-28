const express = require('express')
const router = express.Router()
const {userRegister, userLogin, verifyToken, forgotten, verifyOTP} = require('../controller/user.controller')


router.post('/user/register', userRegister)
router.post('/user/login', userLogin)
router.post('/user/verifyToken', verifyToken)
router.post('/forgot', forgotten)
router.post('/verifyotp', verifyOTP)

module.exports = router 