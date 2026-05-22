const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Booking = require("./models/Booking");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Ara Erika Booking Backend Running");
});

app.post("/api/bookings", async (req, res) => {
  try {
    const booking = new Booking({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      photographyPackage: req.body.photographyPackage,
      preferredDate: req.body.preferredDate,
      preferredTime: req.body.preferredTime,
      location: req.body.location,
      numberOfPeople: Number(req.body.numberOfPeople),
      notes: req.body.notes,
      status: "Pending"
    });

    await booking.save();

    res.status(201).json({
      message: "Booking submitted successfully"
    });

  } catch (error) {
    res.status(400).json({
      message: "Booking failed",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
