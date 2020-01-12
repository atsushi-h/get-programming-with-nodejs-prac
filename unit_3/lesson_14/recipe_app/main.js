const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

// データベース接続を設定
mongoose.connect(
  "mongodb://localhost:27017/recipe_db",
  { useNewUrlParser: true }
);
const db = mongoose.connection;

// データベース接続時
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// クエリの作成
const myQuery = Subscriber.findOne({
  name: "Jon Wexler"
}).where("email", /wexler/);

// クエリの実行
myQuery.exec((error, data) => {
  if (data) console.log(data.name);
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// publicファイルを静的ファイルとして使用
app.use(express.static("public"));

// express-ejs-layoutsを使用
app.use(layouts);

app.get("/name/:myName", homeController.respondWithName);

// エラー処理用ミドルウェア
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
