require("module-alias/register");
const { app } = require("./config");
require("./events");
const initLoad = require("./controller");
const wsServer = require("./wsServer");
const models = require("@models");

if (typeof wsServer === "function") {
  wsServer(app);
}

if (typeof initLoad === "function") {
  initLoad(app);
}

app.listen(8989, () => {
  console.log("server listen on port: 8989");
});
