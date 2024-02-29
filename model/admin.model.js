const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const URI = process.env.URL

mongoose.connect(URI)
  .then((response) => {
    console.log("Admin connected to database successfully");
  })
  .catch((err) => {
    console.log(err);
    console.log("There is an error in the database");
  })

let staffSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  adminId: { type: String, unique: true },
    otp: {
    type: String,
    required: true,
    unique: true
  },
  otpExpiration: {
    type: Date
  }

})

staffSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10, ((err, hash) => {
    console.log(hash);
    this.password = hash
    next()
  }))
})

let adminModel = mongoose.model('adminModel', staffSchema);

module.exports = adminModel;