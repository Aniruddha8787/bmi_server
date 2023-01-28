const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { UserModel } = require("./models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const bmirouter = require("./routes/bmi.route");
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to Mock 15");
});

app.post("/signup", async (req, res) => {
  const { name,email, password } = req.body;
  const userp = await UserModel.findOne({ email });
  if (userp?.email) {
    res.send("already exist");
  } else {
    try {
      bcrypt.hash(password, 5, async function (err, hash) {
        const user = new UserModel({name, email, password: hash });
        await user.save();
        res.send("Sign up successfully");
      });
    } catch (err) {
      console.log(err);
      res.send("Something went wrong");
    }
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });

    if (user.length > 0) {
      const hashed_p = user[0].password;
      bcrypt.compare(password, hashed_p, function (err, result) {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "hush");
          res.send({msg:"Login successfully", token: token });
        } else {
          res.send("Login failed");
        }
      });
    } else {
      res.send("Login failed");
    }
  } catch {
    res.send("Login failed");
  }
});



app.use("/bmi", bmirouter);




app.listen(8989, async () => {
  try {
    await connection;
    console.log("Connected to DB Successfully");
  } catch (err) {
    console.log("Error connecting to DB");
    console.log(err);
  }
  console.log("Listening on PORT 8989");
});
