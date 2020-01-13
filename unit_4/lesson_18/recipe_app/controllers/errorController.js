const httpStatus = require("http-status-codes");

// エラー処理用ミドルウェア
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack);
  next(error);
};

// ステータスコード404でレスポンス
exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);

  // エラーコードを送信
  // res.send(`${errorCode} | The page does not exist!`);

  // 404.htmlを送信
  res.sendFile(`./public/${errorCode}.html`, {
    root: "./"
  });
};

// すべてのエラーをキャッチし、ステータスコード500でレスポンス
exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};
