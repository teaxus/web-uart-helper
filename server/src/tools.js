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


/**
 * 对象转json字符串.
 *
 * @param {object} obj 对象.
 */
function mkJsonStr(obj) {
  let return_json_str = JSON.stringify(obj);
  return return_json_str;
}

/**
 * 将一维数据分割成二维数组.
 *
 * @param {number} num 分割的列数.
 * @param {Array} arr 一维数组.
 */
 function arrTrans(num, arr) {
  const newArr = [];
  while (arr.length > 0) {
    newArr.push(arr.splice(0, num));
  }
  return newArr;
}


module.exports = {
  makeDirRecursionSync, mkJsonStr, arrTrans
};
