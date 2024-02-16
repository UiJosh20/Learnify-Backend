const express = require('express')
const cors = require('cors')
require('dotenv').config()
let PORT = process.env.PORT;
const userRoutes = require('./routes/user.route')

const app = express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/', userRoutes)



app.listen(PORT,()=>{
    console.log(`i am running on PORT: ${PORT}`);
})