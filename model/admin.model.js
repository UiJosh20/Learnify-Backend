const mongoose = require('mongoose');
const URI = process.env.URL

mongoose.connect(URI)
.then((response)=>{
    console.log("adminconnected to database successfully");
})
.catch((err)=>{
    console.log(err);
    console.log("There is an error in the database");
})

let staffSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:{type: String, required:true, unique:true},
    password:{type:String, required:true, unique:true}
})

let adminModel = mongoose.model('adminModel', staffSchema);

module.exports = adminModel;