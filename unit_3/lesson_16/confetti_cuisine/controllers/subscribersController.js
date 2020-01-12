// Subscriberモデル
const Subscriber = require("../models/subscriber");

// すべての購読者を検索
exports.getAllSubscribers = (req, res) => {
  Subscriber.find({})
    .exec()
    .then(subscribers => {
      res.render("subscribers", {
        subscribers: subscribers
      });
    })
    .catch(error => {
      console.log(error.message);
      return [];
    })
    .then(() => {
      console.log("promise complete");
    });
};

// 購読者用ページを表示
exports.getSubscriptionPage = (req, res) => {
  res.render("contact");
};

// 購読者を保存
exports.saveSubscriber = (req, res) => {
  const newSubscriber = new Subscriber();
  newSubscriber.name = req.body.name;
  newSubscriber.email = req.body.email;
  newSubscriber.zipCode = req.body.zipCode;

  // const newSubscriber = new Subscriber({
  //   name: req.body.name,
  //   email: req.body.email,
  //   zipCode: req.body.zipCode
  // });
  newSubscriber
    .save()
    .then(result => {
      res.render("thanks");
    })
    .catch(error => {
      if (error) res.send(error);
    });
};
