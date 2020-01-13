const express = require("express");
const app = express();
const router = express.Router();
const homeController = require("./controllers/homeController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");
const errorController = require("./controllers/errorController");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
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

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// Routerモジュールを使用
app.use("/", router);

// publicファイルを静的ファイルとして使用
router.use(express.static("public"));

// express-ejs-layoutsを使用
router.use(layouts);

// POST処理(Body Parser)
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// method-overrideモジュールを使用
router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

router.get("/", homeController.index);
router.get("/contact", homeController.getSubscriptionPage);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);

router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/courses", coursesController.index, coursesController.indexView);

router.post("/subscribe", subscribersController.saveSubscriber);

// エラー処理用ミドルウェア
router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
