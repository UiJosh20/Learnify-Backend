const LastModel = require('../model/user.model');
const nodemailer = require('nodemailer');

const generateUniqueNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000);
}

const uniqueNumber = generateUniqueNumber();

const userRegister = (req, res) => {
    console.log(req.body);
    const student = new LastModel(req.body);
    const {email} = req.body
    student.uniqueNumber = uniqueNumber;
    sendUniqueNumberToEmail(email, uniqueNumber)
    student.save()
        .then(() => {
            console.log("User saved successfully");
            res.status(201).send({ message: "User registered successfully", status : 200});
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        });
};


function sendUniqueNumberToEmail(email, uniqueNumber) {
    return new Promise((resolve, reject) => {
        // Example implementation using nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',
                pass: ''
            }
        });

        const mailOptions = {
            from: 'adeyeriseun10@gmail.com',
            to: email,
            subject: 'Your Unique Number',
            text: `Your unique number is: ${uniqueNumber}`
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
   
};

module.exports = { userRegister, userLogin };
