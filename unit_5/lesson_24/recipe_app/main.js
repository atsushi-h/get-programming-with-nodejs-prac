const express = require("express");
const app = express();
const router = express.Router();
const homeController = require("./controllers/homeController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController.js");
const coursesController = require("./controllers/coursesController.js");
const errorController = require("./controllers/errorController");
const User = require("./models/user");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const expressValidator = require("express-validator");
const passport = require("passport");

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

// Routerモジュールを使用
app.use("/", router);

// GETとPOSTのリクエストを他のメソッドとして解釈する設定
router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

// バリデーション用ミドルウェアを使用
// express.json, express.urlencodedより前に記入
router.use(expressValidator());

// URLエンコーディングとJSONパラメータの処理
router.use(
  express.urlencoded({
    extended: false
  })
);
router.use(express.json());

// フラッシュメッセージを使用
router.use(cookieParser("secret_passcode"));
router.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);
router.use(connectFlash());

router.use((req, res, next) => {
  // passportのログイン状態をレスポンスのローカル変数に代入
  res.locals.loggedIn = req.isAuthenticated();
  // ログインしたユーザをレスポンスのローカル変数に代入
  res.locals.currentUser = req.user;
  // フラッシュメッセージをレスポンスのローカル変数に代入
  res.locals.flashMessages = req.flash();
  next();
});

// passportを初期化
router.use(passport.initialize());
// Express.jsのセッションを使うようにpassportを設定
router.use(passport.session());
// Userのログイン設定
passport.use(User.createStrategy());
// Userのシリアライズ、デシリアイズの設定
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// publicファイルを静的ファイルとして使用
router.use(express.static("public"));

// express-ejs-layoutsを使用
router.use(layouts);

router.get("/", homeController.index);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post(
  "/users/create", 
  usersController.validate, 
  usersController.create, 
  usersController.redirectView
);
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate);
router.get("/users/logout", usersController.logout, usersController.redirectView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post(
  "/subscribers/create",
  subscribersController.create,
  subscribersController.redirectView
);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put(
  "/subscribers/:id/update",
  subscribersController.update,
  subscribersController.redirectView
);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.delete(
  "/subscribers/:id/delete",
  subscribersController.delete,
  subscribersController.redirectView
);

router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView);
router.get("/courses/:id/edit", coursesController.edit);
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
router.get("/courses/:id", coursesController.show, coursesController.showView);
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);

// エラー処理用ミドルウェア
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

// サーバー起動
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
