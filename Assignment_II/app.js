// ===========Assignment 2 ===========================
// Write a nodejs route 
// Method: POST 
// URL: Localhost 
// Payload: {
//             "str": "some words"
            // }
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
// 1) Write a localhost route to accept above payload
app.post("/", (req, res) => {
  const payload = req.body;
  if (!payload || !payload.str) {
    return res.status(400).send("Bad Request");
  }

  const words = payload.str.split(/\s+/); // Split by whitespace characters
  //   2) Using regex check if there are at least 8 words (not characters)
  if (words.length >= 8) {
    // 3) Return 200 OK if at least 8 words
    return res.status(200).send("OK");
  } else {
    // 4) Return Not Acceptable if not 8 words
    return res.status(406).send("Not Acceptable");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
