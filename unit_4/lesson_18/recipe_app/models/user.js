const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    first: {
      type: String,
      trim: true
    },
    last: {
      type: String,
      trim: true
    }
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  zipCode: {
    type: Number,
    min: [1000, "Zip code too short"],
    max: 99999
  },
  // パスワード
  // 本来、データベースに平文で保存するのは推奨されない
  password: {
    type: String,
    required: true
  },
  // ユーザとコースの関連付け
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  // ユーザと購読者の関連付け
  subscribedAccount: {
    type: Schema.Types.ObjectId,
    ref: "Subscriber"
  }
}, {
  // タイムスタンプ
  // createdAtとupdatedAtを記録
  timestamps: true
});

// ユーザのフルネームを取得する仮属性を追加
userSchema.virtual("fullname").get(function() {
  return `${this.name.first} ${this.name.last}`;
});

module.exports = mongoose.model("User", userSchema);
