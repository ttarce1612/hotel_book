var express = require("express");
var authRouter = require("./auth");
var bookRouter = require("./book");
var hotelRouter = require("./hotel");
var app = express();

app.use("/auth/", authRouter);
app.use("/book/", bookRouter);
app.use("/hotel/", hotelRouter);

module.exports = app;