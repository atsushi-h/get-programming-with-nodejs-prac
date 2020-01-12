const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");
const subscribersController = require("./controllers/subscribersController");
const errorController = require("./controllers/errorController");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

// MongooseでPromiseを使用
mongoose.Promise = global.Promise;

// データベース接続を設定
mongoose.connect(
  "mongodb://localhost:27017/confetti_cuisine",
  { useNewUrlParser: true }
);

app.set("port", process.env.PORT || 3000);

// ejsを使用
app.set("view engine", "ejs");

// URLエンコーディングとJSONパラメータの処理
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

// publicファイルを静的ファイルとして使用
app.use(express.static("public"));

// express-ejs-layoutsを使用
app.use(layouts);

// Topページの経路
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);

// エラー処理用ミドルウェア
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// サーバー起動
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
