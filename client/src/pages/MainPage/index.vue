<template>
  <div class="main-page-container">
    <!-- <particles-bg color="#2a2a2e" type="square" :bg="true" /> -->
    <side-bar :sideBarStatus.sync="sideBarStatus" :serialPortConnectConfig="serialPortConnectConfig"
      @configSerialPortConnect="showSerialPortConnectConfig = true" @barMiniChange="barMiniChange"
      @openControl="uartControl" @TxPanelChange="TxPanelChange" @RxPanelChange="RxPanelChange" />
    <div style="padding-left: 60px;margin-left: 60px;">

      <!-- 接收面板 Begin -->
      <component :is="StyleWhite">
        <hsc-window title="接收面板" :isOpen.sync="sideBarStatus.open_rx_panel" :closeButton="true"
          :left.sync="rxWindowInfo.left" :top.sync="rxWindowInfo.top" :width.sync="rxWindowInfo.width"
          :height.sync="rxWindowInfo.height" :isScrollable="true" :resizable="true" :minWidth="50" :minHeight="50">
          <div>
            <rx-planel />
          </div>
        </hsc-window>
        <!-- 接收面板 End -->

        <component :is="StyleWhite">
          <hsc-window title="发送面板" :isOpen.sync="sideBarStatus.open_tx_panel" :closeButton="true"
            :left.sync="txWindowInfo.left" :top.sync="txWindowInfo.top" :width.sync="txWindowInfo.width"
            :height.sync="txWindowInfo.height" :isScrollable="true" :resizable="true" :minWidth="50" :minHeight="50">
            <div>
              <tx-planel />
            </div>
          </hsc-window>
        </component>
      </component>

    </div>
    <div class="uart-config-container">
      <uart-config ref="UartConfig" v-model="showSerialPortConnectConfig"
        :serialPortConnectConfig.sync="serialPortConnectConfig" />
    </div>
  </div>
</template>

<script>
  import index from "./index.js";
  export default index;
</script>
<style lang="css" src="./index.css" scoped />