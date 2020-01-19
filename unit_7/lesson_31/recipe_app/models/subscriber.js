const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriberSchema = new Schema({
  name: {
    type: String,
    required: true // 必須
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  zipCode: {
    type: Number,
    min: [10000, "Zip code too short"],
    max: 99999
  },
  // 複数のコースを関連付ける
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
}, {
  // タイムスタンプ
  // createdAtとupdatedAtを記録
  timestamps: true
});

// 購読者の情報を取得するインスタンスメソッドを追加
subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
};

module.exports = mongoose.model("Subscriber", subscriberSchema);
