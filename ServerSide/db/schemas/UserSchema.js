const mongoose = require("mongoose");

// Register Schema **********
const register_user_schema = new mongoose.Schema({
  fName: {
    type: String,
    required: [true, 'User First Name is required'],
    minLength: [2, "Name is too short"],
    maxLength: [50, "Name is too long"],
  },
  lName: {
    type: String,
    required: [true, 'User last Name is required'],
    minLength: [2, "Name is too short"],
    maxLength: [50, "Name is too long"],
  },
  email: {
    type: String,
    required: [true, 'user Email is required'],
    unique: true,
    minlength: [3, 'Email is too short'],
    maxLength: [50, "Email must be less than 50 characters"],
    validate: {
      validator: (em) => {
        const EmailRegEx =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return EmailRegEx.test(em) ? true : false;
      },
      message: "Not a valid Email",
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [4, "Password is too short"],
  },
  isVerified: Boolean,
  Token: String,
  logoAvatar: {type: String, default: Date.now()},
  phone: Number,
  address: String,
  houseNumber: String,
  city: String,
  zip: String,
  country: String,
  bank: String,
  iban: String,
  bic: String,
  clients: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Clients",
    },
  ],
  expenses: {type: Array, default: []},
  hidden: {type: Boolean, default: false},
});

const User = mongoose.model('Users', register_user_schema);


module.exports = { User }