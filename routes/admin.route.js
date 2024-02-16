const express = require('express')
const adminRouter = express.Router()
const {adminRegister, adminLogin} = require('../controller/admin.controller')


adminRouter.post('/admin/register', adminRegister)
adminRouter.post('/admin/login', adminLogin)

module.exports = adminRouter