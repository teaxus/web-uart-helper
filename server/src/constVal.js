// 固定字符串
const path = require("path");

const cache = ".cache";

module.exports = {
  beginStr: "----------------------------------------------------------------",
  keepaliveTime: 1000, // 保持连接周期(ms)
  cache,
  rxRecordPath: path.join(cache, "rxRecordPath.txt"),
};
