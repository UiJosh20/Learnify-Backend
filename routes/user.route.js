const express = require('express')
const router = express.Router()
const {userRegister, userLogin, verifyToken} = require('../controller/user.controller')


router.post('/user/register', userRegister)
router.post('/user/login', userLogin)
router.post('/user/verifyToken', verifyToken)

module.exports = router 