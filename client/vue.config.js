module.exports = {
    // 配置转发代理
    devServer: {
      disableHostCheck: true,
      port: 8081,
      proxy: {
        '/stock': {
          // target: "http://localhost:8301/",
          // target: "http://192.168.2.95:8301/",
          target: "http://47.112.178.255:820/",
          ws: true,
          pathRewrite: {
            '^/stock': '/stock'
          }
        }
      }
    }
  };
  