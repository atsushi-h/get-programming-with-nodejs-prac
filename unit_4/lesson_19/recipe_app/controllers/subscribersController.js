const Subscriber = require("../models/subscriber");

module.exports = {
  index: (req, res, next) => {
    // すべての購読者を検索
    Subscriber.find({})
      .then(subscribers => {
        res.locals.subscribers = subscribers;
        next();
      })
      .catch(error => {
        console.log(`Error fetching subscribers: ${error.message}`);
        next(error);
      });
  },

  // 購読者用ページを表示
  indexView: (req, res) => {
    res.render("subscribers/index");
  },

  // 購読者を保存
  saveSubscriber: (req, res) => {
    let newSubscriber = new Subscriber({
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode
    });
    newSubscriber
      .save()
      .then(result => {
        res.render("thanks");
      })
      .catch(error => {
        if (error) res.send(error);
      });
  }
};
