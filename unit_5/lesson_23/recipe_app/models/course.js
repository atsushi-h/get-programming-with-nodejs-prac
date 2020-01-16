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
  // デフォルトが0で、負の数を許可しない
  maxStudents: {
    type: Number,
    default: 0,
    min: [0, "Course cannot have a negative number of students"]
  },
  cost: {
    type: Number,
    default: 0,
    min: [0, "Course cannot have a negative cost"]
  }
}, {
  // タイムスタンプ
  // createdAtとupdatedAtを記録
  timestamps: true
});

module.exports = mongoose.model("Course", courseSchema);
