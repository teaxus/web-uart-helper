<template>
  <div class="txpanel-container">
    <div class="data-input-container">
      <textarea v-model="inputData" style="width: 100%;height: 150px;" @input="inpuDataChange"/>
    </div>


    <!-- 工具栏 -->
    <div class="tools-box-container">
      <div>
        <van-button type="primary" style="height:52px;" icon="x fa fa-paper-plane-o">发送</van-button>
      </div>
      <div class="data-send-formatter-selector-container">
        <van-button :type="inputType == 1 ? 'primary':'default'" size="mini" icon="x fa fa-database" @click="inputType=1">
          16进制
        </van-button>
        <van-button :type="inputType == 3 ? 'primary':'default'" size="mini" icon="x fa fa-file-text" @click="inputType=3">
          字符串
        </van-button>
      </div>
      <div class="txdata-operator-container">
        <van-button @click="checkTxRecord" size="mini" type="info" icon="x fa fa-search">查看发送记录</van-button>
        <van-button @click="clearTxCache" size="mini" type="danger" icon="x fa fa-trash-o">清空发送记录</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import index from "./index.js";
export default index;
</script>
<style lang="css" src="./index.css" scoped />