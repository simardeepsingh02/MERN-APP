const express= require("express");
const dotenv = require("dotenv");
const app =express();
app.use(express.json());
const mongoose = require("mongoose");
dotenv.config();
const userRoute = require("./routes/userRoute");

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



