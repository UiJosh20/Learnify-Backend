const LastModel = require('../model/user.model');
const bcrypt = require("bcrypt")
const nodemailer = require('nodemailer');


const generateUniqueNumber = () => {
    const currentYear = new Date().getFullYear().toString();
    const randomNumber = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
    const randomAlphabets = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const matricNumber = currentYear + randomNumber + randomAlphabets;

    return matricNumber;
}



const userRegister = (req, res) => {
    console.log(req.body);
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


function sendUniqueNumberToEmail(email, matricNumber) {
    return new Promise((resolve, reject) => {
        // Example implementation using nodemailer
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
            subject: 'Learnify Unique Number',
            text: `Your unique number is: ${matricNumber}`
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
    console.log(req.body);
    const { matricNumber, password } = req.body

    LastModel.findOne({ matricNumber })
        .then((student) => {
            if (!student) {
                console.log("User not found");
                return res.status(404).json({ message: "User not found" });
            }

            bcrypt.compare(password, student.password)
                .then((match) => {
                    if (!match) {
                        console.log("Incorrect password");
                        return res.status(401).json({ message: "Incorrect password" });
                    }

                    res.send({ message: "User signed in successfully", status: true, user: student, });
                })
        });
}

module.exports = { userRegister, userLogin };
