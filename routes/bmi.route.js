const express = require("express");
const bmirouter = express.Router();
const BMIModel = require("../models/Bmi.model");

console.log(BMIModel);

bmirouter.post("/", async (req, res) => {
  try {
    const weight = req.body.weight;
    const height = req.body.height;

   
    const bmi = weight / (height * height);
    console.log(bmi);

    const payload = { weight, height, bmi }
    const bmiData = new BMIModel(payload);
    await bmiData.save();

    res.json({
      status: "success",
      bmi: bmi,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err.message,
    });
  }
});

module.exports = bmirouter;
