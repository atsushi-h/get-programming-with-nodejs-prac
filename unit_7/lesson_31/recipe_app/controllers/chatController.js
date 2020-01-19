const Message = require("../models/message");

module.exports = io => {
  io.on("connection", client => {
    console.log("new connection");

    Message.find({})
      .sort({ createdAt: -1 }) // 作成日時の降順にソート
      .limit(10) // 最大10個
      .then(messages => {
        client.emit("load all messages", messages.reverse());
      });

    client.on("disconnect", () => {
      console.log("user disconnected");
    });

    client.on("message", data => {
      const messageAttributes = {
        content: data.content,
        userName: data.userName,
        user: data.userId
      };
      const m = new Message(messageAttributes);

      // メッセージを保存する
      m.save()
        .then(() => {
          io.emit("message", messageAttributes);
        })
        .catch(error => console.log(`error: ${error.message}`));
    });
  });
};
