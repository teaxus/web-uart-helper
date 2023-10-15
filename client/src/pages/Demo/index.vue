<template>
  <div class="container">
    <ul>
      <li>
        <van-button type="primary" style="width:49%;margin-right: 2%;" icon="x fa fa fa-arrow-up"
          @click="workInCWModeAction">正传</van-button>
        <van-button type="primary" style="width:49%" icon="x fa fa fa-arrow-up"
          @click="workInCWModeSlowAction">正传(慢)</van-button>
      </li>
      <li>
        <van-button type="warning" icon="x fa fa fa-arrow-down" style="width:49%;margin-right: 2%;"
          @click="workInCCWModeAction">反传</van-button>
        <van-button type="warning" icon="x fa fa fa-arrow-down" style="width:49%"
          @click="workInCCWModeSlowAction">反传(慢)</van-button>
      </li>
      <li><van-button type="danger" icon="x fa fa-stop-circle" @click="stopAction">停止</van-button></li>
    </ul>
  </div>
</template>

<script>
import index from "./index.js";
export default index;
</script>
<style lang="less" scoped>
.container {
  padding: 10px;

  ul>li {
    margin-bottom: 10px;

    .van-button--normal {
      width: 100%;
    }
  }
}
</style>
