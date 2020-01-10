const port = 3000;
const express = require("express");
const app = express();

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

app.get("/items/:vegetable", (req, res) => {
  const veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
});

app.listen(port, () => {
  console.log(`The Express.js server has started and is listening on port number: ${port}`);
});
