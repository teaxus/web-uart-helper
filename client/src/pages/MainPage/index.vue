<template>
  <div class="main-page-container">
    <!-- <particles-bg color="#2a2a2e" type="square" :bg="true" /> -->
    <side-bar :sideBarStatus.sync="sideBarStatus" :serialPortConnectConfig="serialPortConnectConfig"
      @configSerialPortConnect="showSerialPortConnectConfig = true" @barMiniChange="barMiniChange"
      @openControl="uartControl" @TxPanelChange="TxPanelChange" @RxPanelChange="RxPanelChange"
      @StudioPanelChange="StudioPanelChange" />
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
      </component>

      <!-- 发送面板 Begin -->
      <component :is="StyleWhite">
        <hsc-window title="发送面板" :isOpen.sync="sideBarStatus.open_tx_panel" :closeButton="true"
          :left.sync="txWindowInfo.left" :top.sync="txWindowInfo.top" :width.sync="txWindowInfo.width"
          :height.sync="txWindowInfo.height" :isScrollable="true" :resizable="true" :minWidth="50" :minHeight="50">
          <div>
            <tx-planel :height="txWindowInfo.height" />
          </div>
        </hsc-window>
      </component>
      <!-- 发送面板 End -->

      <!-- 上位机开发工具 Begin -->
      <component :is="StyleWhite">
        <hsc-window class="studio-tools" title="上位机开发工具" :isOpen.sync="sideBarStatus.open_studio_panel"
          :closeButton="true" :left.sync="studioWindowInfo.left" :top.sync="studioWindowInfo.top"
          :width.sync="studioWindowInfo.width" :height.sync="studioWindowInfo.height" :isScrollable="true"
          :resizable="true" :minWidth="50" :minHeight="50">
          <div>
            <studio :height="studioWindowInfo.height" />
          </div>
        </hsc-window>
      </component>
      <!-- 上位机开发工具 End -->

    </div>
    <div class="uart-config-container">
      <uart-config ref="UartConfig" v-model="showSerialPortConnectConfig"
        :serialPortConnectConfig.sync="serialPortConnectConfig" />
    </div>
  </div>
</template>

<script>
import Studio from "../../components/Studio";
import index from "./index.js";
export default index;
</script>
<style lang="css" src="./index.css" scoped />