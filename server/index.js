const express = require("express");
const app = express();
const mongoose = require("mongoose");
const iService = require("./iservice");

const cors = require("cors");

app.use(express.json());
app.use(cors());

// connection to the cluster
mongoose.connect(
  "mongodb+srv://123456:test123456@6488217cluster.mr3g5ox.mongodb.net/?retryWrites=true&w=majority&appName=6488217Cluster"
);

app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
});

app.post("/register", register)
app.post("/login", login)

async function login(req, res) {
  console.log("on seaching for username...");
  const user = await iService.getByUsername(req.body)
  if (user == null) return res.status(400).json({message: "Please enter a valid Username or Password"})

    if ((user.userbiokey-user.Threshold < req.body.userbiokey) && (user.userbiokey+user.Threshold > req.body.userbiokey)) {
      return res.json(user)
    } else {
      return res.status(400).json({message: "Error: Please enter Password again"})
    }
}

function register(req, res, next) {
  console.log("on creating...");
  iService.create(req.body)
      .then(() => res.json({}))
      .catch(err => next(err));
}

