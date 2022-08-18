const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Transaction = require("./models/transaction");
const app = express();
const Port = process.env.PORT || 7000;

// middlewares
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
});

// DB setup

const db = mongoose.connection;

db.on("error", (error) => console.error(error));

db.once("open", () => console.log("Connected to Database"));

// app setup

app
  .listen(Port, () => {
    console.log(`Server is running on port http://localhost:${Port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });

// Routes

// Getting all
app.get("/transactions", async (req, res) => {
  const transaction = await Transaction.find();
  try {
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//   posting one
app.post("/transactions", async (req, res) => {
  const transaction = new Transaction({
    expenseName: req.body.expenseName,
    expenseAmount: req.body.expenseAmount,
  });

  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// deleting one
app.delete("/transactions/:id", async (req, res) => {
  try {
    const removedTransaction = await Transaction.deleteOne({
      _id: req.params.id,
    });
    res.status(200).json(removedTransaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
