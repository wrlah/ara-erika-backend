const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Booking = require("./models/Booking");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB error:", error.message));

app.get("/", function(req, res) {
  res.send("Ara Erika Booking Backend Running");
});

app.post("/api/bookings", async function(req, res) {
  try {
    const booking = new Booking(req.body);
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

app.listen(PORT, function() {
  console.log("Server running on port " + PORT);
});
