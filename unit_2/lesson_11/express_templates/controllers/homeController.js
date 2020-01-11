exports.respondWithName = (req, res) => {
  const paramsName = req.params.myName;
  res.render("index", { myName: paramsName });
};
