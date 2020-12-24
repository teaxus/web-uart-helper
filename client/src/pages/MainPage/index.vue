<template>
  <div class="main-page-container">
    <!-- <particles-bg color="#2a2a2e" type="square" :bg="true" /> -->
    <side-bar />

  <hsc-window-style-metal>

    <hsc-window title="Window 1" :isScrollable="true" :resizable="true" :minWidth="50" :minHeight="50" :maxWidth="200" :maxHeight="200">
      <van-cell-group>
        <van-field label="端口" placeholder="请输入端口" >
          <template #button>
            <van-button size="small" type="info">选择</van-button>
          </template>
        </van-field>
        <van-field label="波特率" placeholder="请输入波特率" >
          <template #button>
            <van-button size="small" type="info">选择</van-button>
          </template>
        </van-field>
        <van-field label="校验位" placeholder="请选择校验位" >
          <template #button>
            <van-button size="small" type="info" readonly>选择</van-button>
          </template>
        </van-field>
        <van-field label="停止位" placeholder="请选择停止位" >
          <template #button>
            <van-button size="small" type="info" readonly>选择</van-button>
          </template>
        </van-field>
      </van-cell-group>
    </hsc-window>

    <hsc-window title="Window 2" :isScrollable="true" :resizable="true" :minWidth="50" :minHeight="50" :maxWidth="100" :maxHeight="100">
      <div style="overflow: hidden;width: 150px;">
        Parameters:
        xxxxxxxxx
      </div>
    </hsc-window>

  </hsc-window-style-metal>
    
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
