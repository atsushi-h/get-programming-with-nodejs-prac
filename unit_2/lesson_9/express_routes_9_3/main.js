const port = 3000;
const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");
const signUpController = require("./controllers/userSignUpProcessor");

// URLエンコードされたデータを解析する
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

// クエリ文字列を出力する
app.use((req, res, next) => {
  console.log(req.query);
  next();
});

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/sign_up", signUpController.signUp);

app.listen(port, () => {
  console.log(`The Express.js server has started and is listening on port number: ${port}`);
});
