const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoice_schema = new Schema({
  items: [
    {
      description: {
        type: String,
        required: [true, 'Invoice description is required'],
      },
      hours: {
        type: String,
        required: [true, 'Invoice Unit/Hours required'],
      },
      amount: {
        type: String,
        required: [true, 'Invoice Amount is required'],
      },
      tax: {
        type: String,
        default: 0,
      }
    },
  ],
  date: Date,
  invoiceNumber: Number,
  message: String,
  client_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Clients",
  },
  clientName: String,
  hidden: {type: Boolean, default: false},
});

const Invoice = mongoose.model("Invoices", invoice_schema);

module.exports = { Invoice }
