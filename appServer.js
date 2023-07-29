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

    readFromDBFile((readError, existingData) => {
        if (readError) {
          return res.status(500).send("Error reading file");
        }
    
        // Find the user with the given username and password in the existing data
        const user = existingData.find((user) => user.username === username && user.password === password);
    
        if(user) {
        // res.status(200).send("success");
        req.session.isLoggedIn = true;
        req.session.username = username;
        res.redirect("/");
        return;
    }

    res.status(401).send("error");
});
});

app.get("/signup", function (req, res) {
    res.sendFile(__dirname + "/views/signup.html");
});

app.get("/client.js", function (req, res) {
    res.sendFile(__dirname + "/views/client.js");
});



app.post("/signup", function (req, res) {
    console.log(req.body);
  
    readFromDBFile((readError, existingData) => {
      if (readError) {
        return res.status(500).send("Error reading file");
      }

      // Check if the given username already exists in the existing data
    const usernameExists = existingData.some((user) => user.username === req.body.username);

    if (usernameExists) {
      return res.status(401).send("Username already exists. Choose a different username.");
    }
  
      // Push the new data to the existing data
      existingData.push(req.body);
  
      writeToDBFile(existingData, (writeError) => {
        if (writeError) {
          return res.status(500).send("Error writing to file");
        }
  
        res.status(200).send("Data has been saved to file successfully.");
      });
    });
  });



app.listen(3000, function () {
    console.log("Connection stablished");
});



// Function to read data from the file
function readFromDBFile(callback) {
    fs.readFile("./db.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return callback(err, null);
      }
      let existingData;
      try {
        existingData = JSON.parse(data);
        if (!Array.isArray(existingData)) {
          // If existingData is not an array, initialize it as an empty array
          existingData = [];
        }
      } catch (parseError) {
        console.error("Error parsing existing data:", parseError);
        return callback(parseError, null);
      }
      return callback(null, existingData);
    });
  }
  
  // Function to write data to a file
  function writeToDBFile(data, callback) {
    const jsonData = JSON.stringify(data);
  
    fs.writeFile("./db.txt", jsonData, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return callback(err);
      }
  
      console.log("Data has been saved to file successfully.");
      return callback(null);
    });
  }

