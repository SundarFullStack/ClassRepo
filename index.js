//STEP 1: IMPORT ALL INSTALLED NECESSARY PACKAGES TO BUILD NODE SERVER

const express = require("express");

const http_server = express();

const cors = require("cors");

const bodyParser = require("body-parser");

//CONFIGURING DOTENV FILE

require("dotenv").config();

// console.log(process.env);

//CORS

http_server.use(cors());

//BODY PARSER

http_server.use(bodyParser.urlencoded({ extended: false }));

http_server.use(bodyParser.json());

//CONFIGURING DB FILE

require("./Database/dbConfig");

//PORT

const port = 5000;

http_server.listen(port, "0.0.0.0", () => {
  console.log("SERVER STARTED IN THE PORT", port);
});

http_server.use("/", require("./app"));
