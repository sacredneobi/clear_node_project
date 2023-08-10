const fs = require("fs");
const path = require("path");

const readDir = (dir, cb) => {
  const dirRead = fs.readdirSync(dir, { withFileTypes: true });
  const newDir = dirRead.filter((item) => item.isDirectory());
  const newFile = dirRead.filter((item) => !item.isDirectory());

  cb(
    dir,
    newFile.map((item) => item.name)
  );

  newDir.forEach((item) => {
    readDir(dir + path.sep + item.name, cb);
  });
};

const fileWalk = (dir, cb) => {
  readDir(dir, cb);
};

module.exports = { fileWalk };
