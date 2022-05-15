const mongoose = require("mongoose");

const client_schema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Client Name is required'],
    minlength: [3, "Name is too short"],
    maxlength: [50, "Name is too long"],
  },
  email: {
    type: String,
    required: [true, 'Client Email is required'],
    minlength: [3, `Email  required 10 at least`],
    maxlength: [50, "Email must be less than 50 characters"],
    validate: {
      validator: (em) => {
        const EmailRegEx =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return EmailRegEx.test(em) ? true : false;
      },
      message: "Not a valid Email",
    },
  },
  telephone: {
    type: Number,
    minlength: [4, "Phone number is too short"],
    maxlength: [15, "Phone number is too long"]
  },
  address: {
    address: { type: String, required: [true, 'Client address is required']},
    houseNumber: { type: String, required: [true, 'Client house number is required']},
    city: { type: String, required: [true, 'Client city is required']},
    zip: { type: String, required: [true, 'Client zip is required']},
    country: String,
  },
  invoices: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Invoices",
    },
  ],
  hidden: {type: Boolean, default: false},
});


const Client = mongoose.model("Clients", client_schema);

module.exports = { Client }
