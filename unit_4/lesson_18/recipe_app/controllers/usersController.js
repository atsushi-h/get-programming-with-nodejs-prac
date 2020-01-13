const User = require("../models/user");

module.exports = {
  index: (req, res, next) => {
    // クエリを発行
    User.find()
      .then(users => {
        // ユーザデータをレスポンスに格納
        res.locals.users = users;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  // ビューをレンダリング
  indexView: (req, res) => {
    res.render("users/index");
  }
};
