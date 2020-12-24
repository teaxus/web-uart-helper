<template>
  <sidebar-menu
    :collapsed="min_silder_bar"
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
        @click="uart_is_opened = !uart_is_opened"
      >
        <sidebar-menu-icon
          v-if="uart_is_opened == false"
          icon="fa fa-power-off"
        />
        <sidebar-menu-icon
          v-else
          icon="fa fa-power-off"
          style="color: rgb(7, 193, 96)"
        />
      </div>
    </template>
    <template slot="config" slot-scope="scope">
      <div v-if="scope.show" class="main-func-item">
        <van-button
          style="text-align: left"
          size="small"
          icon="x fa fa-wrench"
          type="info"
          icon-position="right"
          :disabled="uart_is_opened"
        >
          <div style="margin-right: 5px">
            <div><span>端口:xxxxxxxx/波特率:96000</span></div>
            <div>
              <span>校验位:None/数据位:8/停止位:1</span>
            </div>
          </div>
        </van-button>
      </div>
      <div v-else class="main-func-item-minify">
        <sidebar-menu-icon icon="fa fa-wrench" />
      </div>
    </template>
    <template slot="sendControl" slot-scope="scope">
      <div v-if="scope.show" class="main-func-item">
        <van-button
          color="rgb(7, 193, 96)"
          style="text-align: left;"
          size="small"
          icon="x fa fa-paper-plane"
          :disabled="uart_is_opened"
          @click="open_rx_panel = true"
        >
          <div style="margin-left: 5px">
            <div>打开发送面板</div>
          </div>
        </van-button>
        <van-button
          style="text-align: left; float: right; margin-left: auto"
          size="small"
          icon="x fa fa-wrench"
          type="info"
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
        @click="open_tx_panel = !open_tx_panel"
        :style="open_tx_panel ? 'color:#07c160':''"
      >
        <sidebar-menu-icon icon="fa fa-paper-plane" />
      </div>
    </template>
    <template slot="receiverControl" slot-scope="scope">
      <div v-if="scope.show" class="main-func-item">
        <van-button
          color="rgb(7, 193, 96)"
          style="text-align: left;"
          size="small"
          icon="x fa fa-pencil-square-o"
          :disabled="uart_is_opened"
          @click="open_tx_panel = true"
        >
          <div style="margin-left: 5px">
            <div>打开接收面板</div>
          </div>
        </van-button>
        <van-button
          style="text-align: left; float: right; margin-left: auto"
          size="small"
          icon="x fa fa-wrench"
          type="info"
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
        @click="open_rx_panel = !open_rx_panel"
        :style="open_rx_panel ? 'color:#07c160':''"
      >
        <sidebar-menu-icon icon="fa fa-pencil-square-o" />
      </div>
    </template>
  </sidebar-menu>
</template>
<script>
import index from "./index.js";
export default index;
</script>
<style lang="css" src="./index.css" scoped />
