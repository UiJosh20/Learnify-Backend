const LastModel = require('../model/user.model')


const userRegister = (req, res) =>{
    let student = new LastModel(req.body)
    student.save()
    .then((result)=>{
        console.log("student info saved successfully");
    }).catch((err)=>{
        console.log("There is an error in the database");
    })
}

const userLogin = (req, res) =>{
    const {email, password} = req.body
    console.log(req.body);
}

module.exports = {userRegister, userLogin}