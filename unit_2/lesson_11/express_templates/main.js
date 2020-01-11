const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const layouts = require("express-ejs-layouts");

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
