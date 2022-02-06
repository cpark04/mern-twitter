const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const User = require('./models/User');
const passport = require('passport')
const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);

app.get("/", (req, res) => {
  const user = new User({
    handle: 'Jim',
    email: 'jim@jim.jim',
    password: 'jimisgreat123'
  })

  user.save()
  res.send("Bye World")
});


app.listen(port, () => console.log(`Server is running on port ${port}`));


app.use("/api/users", users);
app.use("/api/tweets", tweets);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
