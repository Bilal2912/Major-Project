const express = require('express');
const app = express();
const cookieparser = require('cookie-parser');
const bodyparser = require('body-parser');
const fileUpload = require("express-fileupload");
const path = require("path");
const dotenv = require('dotenv');

const errorMiddleware = require('./middleware/error')

// Config
dotenv.config({path:'backend/config/config.env'});

app.use(express.json());
app.use(cookieparser());
app.use(bodyparser.urlencoded({ extended:true}));
app.use(fileUpload());


// Route Imports
const course = require("./routes/courseRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", course);
app.use("/api/v1", user);

// Middleware for errors
app.use(errorMiddleware)

module.exports = app