<template>
  <div class="main-page-container">
    <sidebar-menu :collapsed="open_silder_bar" :menu="menu">
        <!-- 顶部工具栏 -->
        <div slot="toggle-iconxxx" class="main-func-item">
          <van-button
            style="text-align: left"
            size="small"
            icon="setting"
            type="info"
            icon-position="right" :disabled="uart_is_opened">
            <div style="margin-right:5px;">
              <div><span>端口:xxxxxxxx/波特率:96000</span></div>
              <div>
                <span>校验位:None/数据位:8/停止位:1</span>
              </div>
            </div>
          </van-button>
        </div>
    </sidebar-menu>
    <div>
      <!-- 顶部工具栏 -->
      <div class="main-func-item">
        <van-button
          style="text-align: left"
          size="small"
          icon="setting"
          type="info"
          icon-position="right" :disabled="uart_is_opened">
          <div style="margin-right:5px;">
            <div><span>端口:xxxxxxxx/波特率:96000</span></div>
            <div>
              <span>校验位:None/数据位:8/停止位:1</span>
            </div>
          </div>
        </van-button>
      </div>
      <div class="main-func-item">
        <van-switch v-model="uart_is_opened" active-color="#07c160" inactive-color="#ee0a24"/>
        <div class="data-tran-status">
          <div id="chartLineBox" style="width:100%;height:100%" />
          <div v-if="uart_is_opened == false" class="data-tran-status-mask">
            端口已关闭
          </div>
        </div>
      </div>
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
