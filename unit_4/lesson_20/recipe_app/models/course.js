const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  items: [],
  zipCode: {
    type: Number,
    min: [10000, "Zip code too short"],
    max: 99999
  }
}, {
  // タイムスタンプ
  // createdAtとupdatedAtを記録
  timestamps: true
});

module.exports = mongoose.model("Course", courseSchema);
