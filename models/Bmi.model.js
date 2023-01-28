const mongoose = require("mongoose");
const BMISchema = new mongoose.Schema({
  weight: Number,
  height: Number,
  bmi: Number,
});

const BMIModel = mongoose.model("BMIModel", BMISchema);
module.exports = BMIModel;
