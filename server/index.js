// Require necessary modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const iService = require("./iservice");

// Require CORS middleware
const cors = require("cors");

// Use JSON parsing middleware
app.use(express.json());
// Use CORS middleware
app.use(cors());

// Connect to MongoDB cluster
mongoose.connect(
  "mongodb+srv://123456:test123456@6488217cluster.mr3g5ox.mongodb.net/?retryWrites=true&w=majority&appName=6488217Cluster"
);

// Start the server
app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
});

// Define route for user login
app.post("/login", login);
// Define route for user registration
app.post("/register", register);

// Login route handler
async function login(req, res) {
  // Log searching message
  console.log("on searching for username...");
  // Call the getByUsername function from iService to find the user
  const user = await iService.getByUsername(req.body);
  // If user not found, return error message
  if (user == null) return res.status(400).json({ message: "Please enter a valid Username or Password" });

  // Check if userbiokey is within the threshold
  if ((user.userbiokey - user.Threshold < req.body.userbiokey) && (user.userbiokey + user.Threshold > req.body.userbiokey)) {
    return res.json(user); // Return user data if within threshold
  } else {
    return res.status(400).json({ message: "Error: Please enter Password again" }); // Return error if userbiokey is outside threshold
  }
}

// Registration route handler
function register(req, res, next) {
  // Log creating message
  console.log("on creating...");
  // Call the create function from iService to register the user
  iService.create(req.body)
    .then(() => res.json({})) // Return success message
    .catch(err => next(err)); // Handle error if registration fails
}
