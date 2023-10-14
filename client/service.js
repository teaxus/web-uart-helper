//service.js
const express = require('express');
const app = express();
const path = require('path');
 
app.use(express.static(path.join(__dirname, 'dist')));//注意这里使用path.join(__dirname, 'dist')而不是'dist'，虽然在命令行中执行起来效果是一样的，不过pkg打包会无法识别到dist目录
 
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log(`AIbuy agents server start successfully on http://${host}:${port}`)
})