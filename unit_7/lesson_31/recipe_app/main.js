const express = require("express");
const app = express();
const router = require("./routes/index");
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

// アプリケーション変数tokenをセット
app.set("token", process.env.TOKEN || "recipeT0k3n");

// ejsを使用
app.set("view engine", "ejs");

// GETとPOSTのリクエストを他のメソッドとして解釈する設定
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

// バリデーション用ミドルウェアを使用
// express.json, express.urlencodedより前に記入
app.use(expressValidator());

// URLエンコーディングとJSONパラメータの処理
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

// フラッシュメッセージを使用
app.use(cookieParser("secret_passcode"));
app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);
app.use(connectFlash());

app.use((req, res, next) => {
  console.log(req.isAuthenticated());
  console.log(req.user);
  // passportのログイン状態をレスポンスのローカル変数に代入
  res.locals.loggedIn = req.isAuthenticated();
  // ログインしたユーザをレスポンスのローカル変数に代入
  res.locals.currentUser = req.user;
  // フラッシュメッセージをレスポンスのローカル変数に代入
  res.locals.flashMessages = req.flash();
  next();
});

// passportを初期化
app.use(passport.initialize());
// Express.jsのセッションを使うようにpassportを設定
app.use(passport.session());
// Userのログイン設定
passport.use(User.createStrategy());
// Userのシリアライズ、デシリアイズの設定
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// publicファイルを静的ファイルとして使用
app.use(express.static("public"));

// express-ejs-layoutsを使用
app.use(layouts);

// Routerモジュールを使用
app.use("/", router);

// サーバー起動
const server = app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost: ${app.get("port")}`);
});
const io = require("socket.io")(server);
require("./controllers/chatController")(io);
