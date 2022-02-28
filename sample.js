require("crypto").randomBytes(128, function (err, buffer) {
  var token = buffer.toString("hex");
  console.log(token);
});
