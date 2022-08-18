const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  expenseName: {
    type: String,
    required: true,
  },
  expenseAmount: {
    type: Number,
    required: true,
  },
  expenseDate: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
