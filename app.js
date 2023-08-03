const express = require("express");

const app_server = express();

app_server.use("/mentor", require("./Controllers/Mentor.controller"));
app_server.use("/student", require("./Controllers/Student.controller"));

module.exports = app_server;
