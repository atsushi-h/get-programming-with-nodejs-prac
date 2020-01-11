const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// express-ejs-layoutsを使用
app.use(layouts);

app.get("/name/:myName", homeController.respondWithName);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
