const app = require("./app");

// Setup Server
const server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
})
