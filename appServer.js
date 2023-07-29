const express = require('express');
const fs = require('fs');
var session = require('express-session')

const app = express();

app.use(session({                       // express-session is a middleware for Express that enables session management in your web application. 
    secret: 'kch bhi likh skte h ',             // It creates and maintains sessions for users, allowing you to store user-specific data across multiple requests.
    resave: false,
    saveUninitialized: true,
  }))

app.use(express.json());                    // The express.json() middleware is used to parse JSON data sent in the request body.
                                             // It allows you to access the JSON data in your route handlers through req.body.

app.use(express.urlencoded({extended: true })); // The express.urlencoded() middleware is used to parse URL-encoded data sent in the request body. 
                                                // It allows you to access form data submitted via POST requests in your route handlers through req.body.



app.get("/", function (req, res) {
    if(!req.session.isLoggedIn) {
        res.redirect("/login");
        return;
    }

    res.sendFile(__dirname + "/views/home.html");
});

app.get("/login", function (req, res) {
    res.sendFile(__dirname + "/views/login.html");
});

app.post("/login", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // console.log(username);
    if(username === "shan" && password === "shan") {
        // res.status(200).send("success");
        req.session.isLoggedIn = true;
        req.session.username = username;
        res.redirect("/");
        return;
    }

    res.status(401).send("error");
});

app.get("/signup", function (req, res) {
    res.sendFile(__dirname + "/views/signup.html");
});

app.listen(3000, function () {
    console.log("Connection stablished");
});
