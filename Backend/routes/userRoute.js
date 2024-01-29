const express = require("express");
const router = express.Router();
const userData = require("../models/userModel");
const Slots = require("../models/slotModel");
const app =express();
const mongoose = require("mongoose");

//CREATE
router.post("/", async (req, res) => {
  console.log(req.body);
  const { name, email, age ,password} = req.body;
  try {
    const userAdded = await userData.create({
      name: name,
      email: email,
      age: age,
      password:password
    });
    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

//GET
router.get("/", async (req, res) => {
    try {
      const allUsers = await userData.find().select('-password');
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

//DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userData.findByIdAndDelete({ _id: id });
    res.status(201).json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//UPDATE
router.patch("/edit/:id", async (req, res) => {
  const { id } = req.params;
  console.log("get body", req.body);
  console.log("get id", id);
  //const { name, email, age } = req.body;
  try {
    const updatedUser = await userData.findOneAndUpdate({email:id}, req.body, {
      new: true,
    });
    updatedUser.password="0";
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//GET SINGLE USER
router.get("/s/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await userData.findOne({ email: id });
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET Login
router.get("/signin/:id/:pass", async (req, res) => {
  const { id } = req.params;
  const { pass } = req.params;
  try {
    const singleUser = await userData.findOne({ email: id });
    if(singleUser.password==pass){
      res.status(200).json({name:singleUser.name,id:singleUser.email});
    }
    else{
      res.status(200).json({res:"Fail"});
    }
    
  } catch (error) {
    res.status(200).json({res:"WrongEmail"});
  }
});


// Get all slots
router.get('/slots', async (req, res) => {
  try {
    const slots = await Slots.find();
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get available slots
router.get('/available-slots', async (req, res) => {
  try {
    const availableSlots = await Slots.find({ isBooked: false });
    res.json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all slots booked by email
router.get('/slots-by-email/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const bookedSlots = await Slots.find({ bookedByEmail: email, isBooked: true });
    res.json(bookedSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new slot
router.post('/add-slot', async (req, res) => {
  const { startTime, endTime } = req.body;

  try {
    const newSlot = new Slots({
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      isBooked: false,
      bookedByEmail: null,
    });

    const savedSlot = await newSlot.save();
    res.status(201).json(savedSlot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Book a slot by ID
router.put('/book-slot/:id', async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const slot = await Slots.findById(id);

    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    if (slot.isBooked) {
      return res.status(400).json({ message: 'Slot already booked' });
    }

    slot.isBooked = true;
    slot.bookedByEmail = email;

    const updatedSlot = await slot.save();
    res.json(updatedSlot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;