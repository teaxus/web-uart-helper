<template>
  <div class="main-page-container">
    <!-- <particles-bg color="#2a2a2e" type="square" :bg="true" /> -->
    <side-bar 
    @barMiniChange="barMiniChange"
    @openControl="uartControl"
    @TxPanelChange="TxPanelChange"
    @RxPanelChange="RxPanelChange"
    />
    <div style="padding-left: 60px;margin-left: 60px;">

      <hsc-window-style-metal>
        <hsc-window :isOpen.sync="isOpen" :closeButton="true" title="接收面板xxxxxxxxxxxxxx|xxxxxxxxxxxxxx" :left="60" :top="0" :isScrollable="true" :resizable="true" :minWidth="50" :minHeight="50">
        xxxx
        </hsc-window>
    
        <hsc-window title="发送面板" :isScrollable="true" :resizable="true" :minWidth="50" :minHeight="50">
          <div style="overflow: hidden;width: 150px;">
            Parameters:
            xxxxxxxxx
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
