// Subscriberモデル
const Subscriber = require("../models/subscriber");

// リクエストから購読者のデータを取り出す
const getSubscriberParams = body => {
  return {
    name: body.name,
    email: body.email,
    zipCode: parseInt(body.zipCode)
  };
};

module.exports = {
  // すべての購読者を検索
  index: (req, res, next) => {
    Subscriber.find()
      .then(subscribers => {
        res.locals.subscribers = subscribers;
        next();
      })
      .catch(error => {
        console.log(`Error fetching subscribers: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("subscribers/index");
  },

  new: (req, res) => {
    res.render("subscribers/new");
  },

  // 新しい購読者を作成
  create: (req, res, next) => {
    const subscriberParams = getSubscriberParams(req.body);
    Subscriber.create(subscriberParams)
      .then(subscriber => {
        res.locals.redirect = "/subscribers";
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error saving subscriber: ${error.message}`);
        next(error);
      });
  },

  // リダレクト処理
  redirectView: (req, res, next) => {
    const redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },
  
  // 購読者のデータを表示
  show: (req, res, next) => {
    const subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then(subscriber => {
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },
  showView: (req, res) => {
    res.render("subscribers/show");
  },

  // 購読者をデータを編集
  edit: (req, res, next) => {
    const subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then(subscriber => {
        res.render("subscribers/edit", {
          subscriber: subscriber
        });
      })
      .catch(error => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  // 購読者をデータを更新
  update: (req, res, next) => {
    const subscriberId = req.params.id;
    const subscriberParams = getSubscriberParams(req.body);

    Subscriber.findByIdAndUpdate(subscriberId, {
      $set: subscriberParams
    })
      .then(subscriber => {
        res.locals.redirect = `/subscribers/${subscriberId}`;
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error updating subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  // 購読者をデータを削除
  delete: (req, res, next) => {
    const subscriberId = req.params.id;
    Subscriber.findByIdAndRemove(subscriberId)
      .then(() => {
        res.locals.redirect = "/subscribers";
        next();
      })
      .catch(error => {
        console.log(`Error deleting subscriber by ID: ${error.message}`);
        next();
      });
  }
};
