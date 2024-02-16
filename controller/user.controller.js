const LastModel = require('../model/user.model')


const register = (req, res) =>{
    let student = new LastModel(req.body)
    student.save()
    .then((result)=>{
        console.log("saved successfully");
    }).catch((err)=>{
        console.log("There is an error in the database");
    })
}

const login = (req, res) =>{
    const {email, password} = req.body
    console.log(req.body);
}

module.exports = {register, login}