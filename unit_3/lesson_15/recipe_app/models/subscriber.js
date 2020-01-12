const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriberSchema = new Schema({
  name: String,
  email: String,
  zipCode: Number
});

module.exports = mongoose.model("Subscriber", subscriberSchema);
