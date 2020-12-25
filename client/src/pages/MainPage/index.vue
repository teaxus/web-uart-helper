<template>
  <div class="main-page-container">
    <particles-bg color="#2a2a2e" type="square" :bg="true" />
    <side-bar :sideBarStatus.sync="sideBarStatus" @barMiniChange="barMiniChange" @openControl="uartControl"
      @TxPanelChange="TxPanelChange" @RxPanelChange="RxPanelChange" />
    <div style="padding-left: 60px;margin-left: 60px;">

      <!-- 接收面板 Begin -->
      <hsc-window-style-metal>
        <hsc-window title="接收面板" :isOpen.sync="sideBarStatus.open_rx_panel" :closeButton="true"
          :left.sync="rxWindowInfo.left" :top.sync="rxWindowInfo.top"
          :width.sync="rxWindowInfo.width" :height.sync="rxWindowInfo.height"
          :isScrollable="true" :resizable="true"
          :minWidth="50" :minHeight="50">
          <div style="padding:10px">
            1、10/16进制转换，文字转换<br/>
            2、清空<br/>
            3、停止/继续显示接收数据<br/>
            4、数据填充符设置<br/>
            5、数据转义规则<br/>
            6、显示接收总量，每秒接收速率<br/>
            7、清空接收总量<br/>
          </div>
        </hsc-window>
        <!-- 接收面板 End -->

        <hsc-window title="发送面板" :isOpen.sync="sideBarStatus.open_tx_panel" :closeButton="true"
          :left.sync="txWindowInfo.left" :top.sync="txWindowInfo.top"
          :width.sync="txWindowInfo.width" :height.sync="txWindowInfo.height"
          :isScrollable="true" :resizable="true"
          :minWidth="50" :minHeight="50">
          <div>
            1、10/16进制，字符串发送<br/>
            2、自动发送，自动发送周期<br/>
            3、统计发送量和每秒发送速率<br/>
            4、清空发送内容<br/>
            5、清空发送总量统计<br/>
            6、自定义发送格式
          </div>
        </hsc-window>

      </hsc-window-style-metal>

    </div>
    <!-- <div class="uart-config-container"> 
      <uart-config ref="UartConfig" />
    </div> -->
  </div>
</template>

<script>
  import index from "./index.js";
  export default index;
</script>
<style lang="css" src="./index.css" scoped />