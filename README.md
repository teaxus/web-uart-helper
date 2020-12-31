# web-uart-helper

web 版串口工具 使用的是 BS 结构

## API：

### 客户端到串口设备

```
Name------------------------------serverAct------------------------------actToClient
获取串口---------------------------getPort--------------------------------updateDriveList
关闭串口---------------------------shutDownUart---------------------------\

```

### 关于 keepalive

keepalive 是串口服务端定期返回状态的地方，例如配置和串口连接情况。可以使用 bindValWithObj(obj,"keyPath","keepalive")绑定
