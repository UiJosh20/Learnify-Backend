const adminModel = require('../model/admin.model')
const bcrypt = require("bcrypt")
const nodemailer = require('nodemailer');
// require("dotenv").config()
// secret = process.env.SECRET
// const jwt = require("jsonwebtoken")

const generateadminId = () => {
    const randomNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); 
    const adminId = 'admin' + randomNumber;
    return adminId;
}


const adminRegister = (req, res) =>{
    let adminId = generateadminId()
    let staff = new adminModel(req.body)
    const { email } = req.body
    staff.adminId = adminId;
    sendUniqueNumberToEmail(email, adminId)
    staff.save()
    .then((result)=>{
        console.log("admin info saved successfully");
        res.status(201).send({ message: "admin registered successfully", status: 200 });
    }).catch((err)=>{
        console.log("Information not saved");
    })
}

const sendUniqueNumberToEmail = (email, adminId) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'adeyeriseun10@gmail.com',
                pass: 'xwmb exbg izak jkvm'
            }
        });

        const mailOptions = {
            from: 'adeyeriseun10@gmail.com',
            to: email,
            subject: 'Learnify staff Unique ID',
            text: `Your Unique Staff ID is: ${adminId}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}


const adminLogin = (req, res) =>{
    const {adminId, password} = req.body
    
    LastModel.findOne({ adminId })
        .then((staff) => {
            if (!staff) {
                console.log("User not found");
                return res.status(404).json({ message: "User not found" });
            }

            bcrypt.compare(password, staff.password, (err, match) => {
                if (err) {
                    console.log("Error comparing passwords:", err);
                    return res.status(500).json({ message: "Internal Server Error" });
                }

                if (!match) {
                    console.log("Incorrect password");
                    return res.status(401).json({ message: "Incorrect password" });
                }else{
                    const token = jwt.sign({ matricNumber }, secret, { expiresIn: '1h' });
                    console.log("User signed in successfully");
                    res.send({ message: "User signed in successfully", status: true, user: staff, token:token});
                }
            });
        })
        .catch((error) => {
            console.error("Error finding user:", error);
            res.status(500).json({ message: "Internal Server Error" });
        });
}


const verifyToken = (req, res)=>{
    const { token } = req.body;
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        console.error('Token verification failed:', err);
      } else {
        console.log(decoded);
        console.log('Token verified successfully');
        res.send({ message: "Token verified successfully", status: true, decoded: decoded, valid:true, token:token });
      }
    });
  }

module.exports = {adminRegister, adminLogin, verifyToken}