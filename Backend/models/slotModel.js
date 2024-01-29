const mongoose = require("mongoose");
const slotSchema = new mongoose.Schema(
    {
    startTime: { 
        type: Date, 
        required: true 
    },
    endTime: { 
        type: Date, 
        required: true 
    },
    isBooked: { 
        type: Boolean, 
        default: false 
    },
    bookedByEmail: {
        type: String, 
        default: null },
  }
);
  
  const Slots = mongoose.model("Slots", slotSchema);
  module.exports = Slots;