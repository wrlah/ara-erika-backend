const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  photographyPackage: String,
  preferredDate: String,
  preferredTime: String,
  location: String,
  numberOfPeople: Number,
  notes: String,
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
