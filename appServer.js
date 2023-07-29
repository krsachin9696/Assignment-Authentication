const express = require('express');
const fs = require('fs');
const app = express();

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/home.html");
})

app.listen(3000, function () {
    console.log("Connection stablished");
});
