const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const server = http.Server(app);
const userRoutes = require("./routes/user.routes");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use("/", userRoutes);

mongoose.Promise = global.Promise;

app.use(function (err, req, res, next) {
  console.error(err);
  var error = {
    status: false,
    status_code: 500,
    message:
      "Something bad happened. Please contact system administrator or try again",
  };
  res.send(error);
});

function startMongo() {
  mongoose.set("useCreateIndex", true);
  mongoose.connect("mongodb://localhost:27017/user", { useNewUrlParser: true });
  mongoose.connection.on("connected", () => {
    console.log("connected to mongodb on mongodb://localhost:27017/user");
  });
  mongoose.connection.on("error", (err) => {
    if (err) {
      console.log("not connected to mongodb due to %s", err);
      process.exit();
    }
  });
}

app.get("/", (req, res) => {
  res.json("Welcome to Test Nish App");
});

app.listen("3000", () => {
  console.log("Server is listening on port 3000");
  startMongo();
});
