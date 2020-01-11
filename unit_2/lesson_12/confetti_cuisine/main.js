const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const layouts = require("express-ejs-layouts");

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

// エラー処理用ミドルウェア
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// サーバー起動
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
