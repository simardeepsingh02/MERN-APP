const express= require("express");
const dotenv = require("dotenv");
const app =express();
app.use(express.json());
const mongoose = require("mongoose");
dotenv.config();
const userRoute = require("./routes/userRoute");

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://astro-y23d.onrender.com/');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Your routes and other middleware here...

// app.listen(5000, () => {
//   console.log('Server is running on port 3000');
// });

mongoose.connect(process.env.URI).
then(()=>{
    console.log("connected successfully");
    app.listen(process.env.PORT || 8000 ,(err)=>{
        if(err) console.log("err");
        console.log("running successfully at",process.env.PORT);
    });
}).catch((error)=>{
    console.log("error",error);
});

app.use(userRoute);



