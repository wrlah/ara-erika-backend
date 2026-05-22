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

app.post("/api/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    res.json({
      message: "Booking submitted successfully"
    });

  } catch (error) {
    res.status(400).json({
      message: "Booking failed"
    });
  }
});

app.get("/", (req, res) => {
  res.send("Ara Erika Booking Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
