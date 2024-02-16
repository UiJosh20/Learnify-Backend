const mongoose = require('mongoose');
const URI = process.env.URL

mongoose.connect(URI)
.then((response)=>{
    console.log("connected to database successfully");
})
.catch((err)=>{
    console.log(err);
    console.log("There is an error in the database");
})

let studentSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:{type: String, required:true, unique:true},
    password:{type:String, required:true, unique:true}
})

let LastModel = mongoose.model('LastModel', studentSchema);

module.exports = LastModel;