const express = require("express");
var bodyParser = require("body-parser");
require("dotenv").config();
const mailchimpFunctions = require("./mailchimp");
const request = require("request");

const app = express();
const port = 3000 || process.env.PORT;

//app.use stuff
app.use(express.static("public"));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/success.html");
});

app.get("/fail", (req, res) => {
  res.sendFile(__dirname + "/fail.html");
});

app.post("/", (req, res) => {
  const email = req.body.email;

  if (email) {
    // Add user to email lsit
    mailchimpFunctions.addSubscriber(email);
    res.redirect("/success");
  } else {
    // use a res.redirect to send them to a failed page
    res.redirect("/fail");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
