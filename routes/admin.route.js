const express = require('express')
const adminRouter = express.Router()
const {adminRegister, adminLogin, verifyToken} = require('../controller/admin.controller')


adminRouter.post('/admin/register', adminRegister)
adminRouter.post('/admin/login', adminLogin)
adminRouter.post('/admin/verifyToken', verifyToken)

module.exports = adminRouter