const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");
const errorController = require("./controllers/errorController");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

// MongooseでPromiseを使用
mongoose.Promise = global.Promise;

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

app.get("/", homeController.index);
app.get("/contact", homeController.getSubscriptionPage);

app.get("/users", usersController.index, usersController.indexView);
app.get("/subscribers", subscribersController.index, subscribersController.indexView);
app.get("/courses", coursesController.index, coursesController.indexView);

app.post("/subscribe", subscribersController.saveSubscriber);

// エラー処理用ミドルウェア
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
