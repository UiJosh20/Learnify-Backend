const express = require('express')
const cors = require('cors')
require('dotenv').config()
let PORT = process.env.PORT;
const userRoutes = require('./routes/user.route')
const adminRoutes = require('./routes/admin.route')

const app = express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/user', userRoutes)
app.use('/admin', adminRoutes)



app.listen(PORT,()=>{
    console.log(` Server running on PORT: ${PORT}`);
})