const mongoose = require("mongoose");

const CheckinSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  checkedIn: { type: Boolean, default: false },
  time: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Checkin", CheckinSchema);
