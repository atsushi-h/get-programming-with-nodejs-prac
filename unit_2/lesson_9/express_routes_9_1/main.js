const port = 3000;
const express = require("express");
const app = express();

// ミドルウェア関数
app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
});

app.get("/items/:vegetable", (req, res) => {
  const veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
});

app.listen(port, () => {
  console.log(`The Express.js server has started and is listening on port number: ${port}`);
});
