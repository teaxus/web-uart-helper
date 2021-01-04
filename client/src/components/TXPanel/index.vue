<template>
  <div class="txpanel-container">
    <div class="data-input-container">
      <textarea v-model="inputData" @input="inpuDataChange"/>
    </div>
    <!-- 工具栏 -->
    <div class="tools-box-container">
      <div class="data-send-selector-container">
        <van-button :type="inputType == 1 ? 'primary':'default'" size="mini" icon="x fa fa-database" @click="inputType=1">
          16进制
        </van-button>
        <van-button :type="inputType == 3 ? 'primary':'default'" size="mini" icon="x fa fa-file-text" @click="inputType=3">
          字符串
        </van-button>
      </div>
    </div>
  </div>
</template>
<script>
import index from "./index.js";
export default index;
</script>
<style lang="css" src="./index.css" scoped />