const fs = require("fs");
const path = require("path");


/**
 * 使用递归方式创建目录.
 *
 * @param {string} dirname 目录路径.
 */
function makeDirRecursionSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (makeDirRecursionSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

module.exports = {
  makeDirRecursionSync
};
