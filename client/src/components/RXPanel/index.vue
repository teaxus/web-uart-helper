<template>
  <div class="rxpanel-container">
    <div style="position: fixed;left: 70%;">
      1、10/16进制转换，文字转换<br />
      2、清空<br />
      3、停止/继续显示接收数据<br />
      4、数据填充符设置<br />
      5、数据转义规则<br />
      6、显示接收总量，每秒接收速率<br />
      7、清空接收总量<br />
    </div>

    <div class="data-container">
      <div class="data-loading">
        <!-- 16进制和文字混合显示 -->
        <table v-if="showType == 1 || showType == 2" class="table-contain">
          <thead>
            <tr>
              <th>
                <div class="table-header"></div>
              </th>
              <th v-for="item in headRow" :key="item">
                <div>
                  {{ prefixZero(item.toString(16).toUpperCase(), 2) }}
                </div>
              </th>
              <th v-if="showType == 1" />
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in showDataArrs" :key="i">
              <td>
                <div class="table-header">
                  {{ prefixZero(i.toString(16).toUpperCase(), 8) }}:
                </div>
              </td>
              <td v-for="(data, k) in item" :key="i + k">
                <div class="table-data">
                  {{
                  data == ""
                  ? ""
                  : prefixZero(
                  data.charCodeAt().toString(16).toUpperCase(),
                  2
                  )
                  }}
                </div>
              </td>
              <td>
                <div v-if="showType == 1" class="table-data-tail">
                  {{ item.join("") }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 单纯显示文字 -->
        <div v-else-if="showType == 3">
          <pre>
          {{ rxData }}
        </pre>
        </div>

        <div id="keepBottom" style="width:100px;height: 1px;margin-top: 60px;"></div>
      </div>
    </div>


    <!-- 工具栏 -->
    <div class="tools-box-container">

      <van-button @click="showType=1">
        16进制文字混合
      </van-button>
      <van-button @click="showType=2">
        单纯显示16进制
      </van-button>
      <van-button @click="showType=3">
        单纯显示文字
      </van-button>

      <van-button @click="pauseReflashNewRx" style="float: right;margin-left: auto;" :type="reflashNewRx ? 'danger':'primary'" :icon="reflashNewRx ? 'x fa fa-pause':'x fa fa-play'">{{reflashNewRx ? '暂停':'继续'}}更新</van-button>
      <van-button @click="clearRxCache" style="float: right;" type="danger" icon="el-icon-delete">清空接收记录</van-button>
    </div>
  </div>
</template>
<script>
  import index from "./index.js";
  export default index;
</script>
<style lang="css" src="./index.css" scoped />