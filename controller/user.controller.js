const LastModel = require('../model/user.model');
const bcrypt = require("bcrypt")
const nodemailer = require('nodemailer');
require("dotenv").config()
secret = process.env.SECRET
const jwt = require("jsonwebtoken")


const generateUniqueNumber = () => {
    const currentYear = new Date().getFullYear().toString();
    const randomNumber = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
    const randomAlphabets = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const matricNumber = currentYear + randomNumber + randomAlphabets;

    return matricNumber;
}



const userRegister = (req, res) => {
    const matricNumber = generateUniqueNumber();
    const student = new LastModel(req.body);
    const { email } = req.body
    student.matricNumber = matricNumber;
    sendUniqueNumberToEmail(email, matricNumber)
    student.save()
        .then(() => {
            console.log("User saved successfully");
            res.status(201).send({ message: "User registered successfully", status: 200 });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        });
};


const sendUniqueNumberToEmail = (email, matricNumber) => {
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
            subject: 'Learnify Student Matric Number (S.M.N)',
            text: `Your Student Matric Number (S.M.N) is : ${matricNumber}`
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


const userLogin = (req, res) => {
    const { matricNumber, password } = req.body;

    LastModel.findOne({ matricNumber })
        .then((student) => {
            if (!student) {
                console.log("User not found");
                return res.status(404).json({ message: "User not found" });
            }

            bcrypt.compare(password, student.password, (err, match) => {
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
                    res.send({ message: "User signed in successfully", status: true, user: student, token:token});
                }
            });
        })
        .catch((error) => {
            console.error("Error finding user:", error);
            res.status(500).json({ message: "Internal Server Error" });
        });
};


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



  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

const forgotten = (req, res) => {
    const { email } = req.body;
    const otp = generateOTP(); 
    const expirationTime = new Date(Date.now() + 30 * 60 * 1000); 

    LastModel.findOneAndUpdate(
        { email },
        { otp, otpExpiration: expirationTime }, 
        { new: true, upsert: true } 
    )
    .then((user) => {
        if(user){
            sendOTPToEmail(email, otp)
                .then(() => {
                    res.status(200).send({ message: 'OTP sent to email', status: true, otp: otp });
                })
                .catch((error) => {
                    res.status(500).json({ error: 'Failed to send OTP to email' });
                });
        }else{
            console.log("user not found");
        }
    })
    .catch((err) => {
        res.status(500).json({ error: 'Database error' });
    });
}


const verifyOTP = (req, res) => {
    const { otp } = req.body;

    LastModel.findOne({ otp })
        .then((user) => {
            if(user.otp == otp && user.otpExpiration > new Date()){
                
                res.status(200).json({ message: 'OTP verified successfully', status: true });
            }else{
                res.status(400).json({ message: 'invalid OTP', status: false });
            }
            
        })
        .catch((error) => {
            res.status(500).json({ error: 'Database error' });
        });
}



  const sendOTPToEmail = (email, otp) => {
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
            subject: 'Learnify forgotten pasword OTP',
            text: `Your one time password OTP is : ${otp}
This OTP is valid for 30 minutes. Please do not share this OTP with anyone.
            `
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


module.exports = { userRegister, userLogin, verifyToken, forgotten, verifyOTP};
