const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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

// CREATE
app.post("/api/bookings", async (req, res) => {
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

// READ
app.get("/api/bookings", async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
});

// UPDATE
app.put("/api/bookings/:id", async (req, res) => {
  const updatedBooking = await Booking.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedBooking);
});

// DELETE
app.delete("/api/bookings/:id", async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);

  res.json({
    message: "Booking deleted"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
