const fs = require("fs");

process.setting = {
  db: {
    username: "postgres",
    password: "postgres",
    database: "swan",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  jwt: "mySecretJWT",
};

try {
  const data = fs.readFileSync("./setting.json");
  if (data) {
    const loadData = JSON.parse(data);
    process.setting = { ...process.setting, ...loadData };
  }
} catch (err) {
  console.error("SETTING", err);
}
