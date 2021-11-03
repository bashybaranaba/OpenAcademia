const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");

const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo DB");
});

mongoose.connection.on("error", (err) => {
  console.log("Error Connecting", err);
});

//models
require("./models/user");
require("./models/post");
require("./models/comment");
require("./models/like");

app.use(cors());

//Middleware that parses data to JSON
app.use(express.json());

//routes
app.use(require("./routes/auth"));
app.use(require("./routes/user"));
app.use(require("./routes/post"));
app.use(require("./routes/comment"));

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
