<template>
  <sidebar-menu
    :collapsed="sideBarStatus.min_silder_bar"
    :menu="menu"
    @toggle-collapse="onToggleCollapse"
    width="226px"
  >
    <span slot="toggle-icon">
      <i class="fa fa-arrows-h" aria-hidden="true"></i>
    </span>
    <template slot="opencontrol" slot-scope="scope">
      <div
        :style="scope.show ? 'display: flex' : 'display: none'"
        class="main-func-item"
      >
        <van-switch
          v-model="uart_is_opened"
          @change="openUartStateDidChange"
          active-color="#07c160"
          inactive-color="#ee0a24"
        />
        <div class="data-tran-status">
          <div id="chartLineBox" style="width: 100%; height: 100%" />
          <div v-if="uart_is_opened == false" class="data-tran-status-mask">
            端口已关闭
          </div>
        </div>
      </div>
      <div
        :style="!scope.show ? 'display: flex' : 'display: none'"
        class="main-func-item-minify"
        @click="openUartStateDidChange(!uart_is_opened)"
      >
        <sidebar-menu-icon
          icon="fa fa-power-off"
          :style="uart_is_opened == false ? '' : 'color: rgb(7, 193, 96)'"
        />
      </div>
    </template>
    <template slot="config" slot-scope="scope">
      <div v-if="scope.show" class="main-func-item">
        <van-button
          style="text-align: left; height: 41px; width: 100%"
          size="small"
          class="black-text"
          color="rgb(249,217,70)"
          icon="x fa fa-wrench"
          icon-position="right"
          :disabled="uart_is_opened"
          @click="configSerialPortConnect"
        >
          <div style="margin-right: 5px">
            <div>
              <span
                >端口:<span
                  style="
                    max-width: 62px;
                    overflow: hidden;
                    display: inline-block;
                    transform: translateY(2.5px);
                  "
                  >{{
                    serialPortConnectConfig.connectPortName || "未选择"
                  }}</span
                >
                <span style="margin-left: 4px">/</span>
                波特率:{{ serialPortConnectConfig.baudRate }}</span
              >
            </div>
            <div>
              <span
                >校验位:{{ serialPortConnectConfig.parity }}/数据位:{{
                  serialPortConnectConfig.dataBits
                }}/停止位:{{ serialPortConnectConfig.stopBits }}</span
              >
            </div>
          </div>
        </van-button>
      </div>
      <div
        v-else
        class="main-func-item-minify"
        @click="configSerialPortConnect"
      >
        <sidebar-menu-icon icon="fa fa-wrench" />
      </div>
    </template>
    <template slot="sendControl" slot-scope="scope">
      <div v-if="scope.show" class="main-func-item">
        <van-button
          color="rgb(7, 193, 96)"
          style="text-align: left"
          size="small"
          icon="x fa fa-paper-plane"
          @click="sideBarStatus.open_rx_panel = !sideBarStatus.open_rx_panel"
        >
          <div style="margin-left: 5px">
            <div>
              {{ sideBarStatus.open_rx_panel ? "关闭" : "打开" }}发送面板
            </div>
          </div>
        </van-button>
        <van-button
          style="text-align: left; float: right; margin-left: auto"
          size="small"
          icon="x fa fa-wrench"
          class="black-text"
          color="rgb(249,217,70)"
          icon-position="right"
          :disabled="uart_is_opened"
        >
          <div style="margin-right: 5px">
            <div>配置</div>
          </div>
        </van-button>
      </div>
      <div
        v-else
        class="main-func-item-minify"
        @click="sideBarStatus.open_tx_panel = !sideBarStatus.open_tx_panel"
        :style="sideBarStatus.open_tx_panel ? 'color:#07c160' : ''"
      >
        <sidebar-menu-icon icon="fa fa-paper-plane" />
      </div>
    </template>
    <template slot="receiverControl" slot-scope="scope">
      <div v-if="scope.show" class="main-func-item">
        <van-button
          color="rgb(7, 193, 96)"
          style="text-align: left"
          size="small"
          icon="x fa fa-pencil-square-o"
          @click="sideBarStatus.open_tx_panel = !sideBarStatus.open_tx_panel"
        >
          <div style="margin-left: 5px">
            <div>
              {{ sideBarStatus.open_tx_panel ? "关闭" : "打开" }}接收面板
            </div>
          </div>
        </van-button>
        <van-button
          style="text-align: left; float: right; margin-left: auto"
          size="small"
          icon="x fa fa-wrench"
          class="black-text"
          color="rgb(249,217,70)"
          icon-position="right"
          :disabled="uart_is_opened"
        >
          <div style="margin-right: 5px">
            <div>配置</div>
          </div>
        </van-button>
      </div>
      <div
        v-else
        class="main-func-item-minify"
        @click="sideBarStatus.open_rx_panel = !sideBarStatus.open_rx_panel"
        :style="sideBarStatus.open_rx_panel ? 'color:#07c160' : ''"
      >
        <sidebar-menu-icon icon="fa fa-pencil-square-o" />
      </div>
    </template>
    <template slot="upperComputerIDE" slot-scope="scope">
      <div v-if="scope.show" class="main-func-item">
        <van-button
          color="rgb(7, 193, 96)"
          style="text-align: left"
          size="small"
          icon="x fa fa-pencil-square-o"
        >
          <div style="margin-left: 5px">
            <div>
              打开上位机开发工具
            </div>
          </div>
        </van-button>
      </div>
    </template>
  </sidebar-menu>
</template>
<script>
import index from "./index.js";
export default index;
</script>
<style lang="css" src="./index.css" scoped />
