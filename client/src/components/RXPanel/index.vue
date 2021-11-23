<template>
  <div class="rxpanel-container">
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
                <div class="cDiv">
                  {{ prefixZero(item.toString(16).toUpperCase(), 2) }}
                </div>
              </th>
              <th v-if="showType == 1" />
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in showDataArrs" :key="i">
              <td>
                <div class="table-header cDiv">
                  {{ prefixZero(i.toString(16).toUpperCase(), 8) }}:
                </div>
              </td>
              <td v-for="(data, k) in item" :key="i + k">
                <div class="table-data cDiv">
                  {{ data == "" ? "" : prefixZero(data.toString(16), 2) }}
                </div>
              </td>
              <td>
                <div v-if="hexTypeShowText" class="table-data-tail">
                  <span
                    v-for="(charData, indexChar) in item"
                    :key="indexChar"
                    >{{ String.fromCharCode(charData) }}</span
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 单纯显示文字 -->
        <div v-else-if="showType == 3">
          <pre>
            {{ showTextOnly }}
          </pre>
        </div>

        <div
          id="keepBottom"
          style="width: 100px; height: 10px; margin-top: 70px"
        ></div>
      </div>
    </div>

    <!-- 工具栏 -->
    <div class="tools-box-container">
      <div class="data-show-selector-container">
        <van-button
          :type="showType == 1 ? 'primary' : 'default'"
          size="mini"
          icon="x fa fa-database"
          @click="showType = 1"
        >
          16进制
        </van-button>
        <van-button
          :type="showType == 3 ? 'primary' : 'default'"
          size="mini"
          icon="x fa fa-file-text"
          @click="showType = 3"
        >
          字符串
        </van-button>
      </div>

      <div>
        <!-- 16进制显示格式选项 -->
        <div v-if="showType == 1" class="data-check-func-container">
          <van-checkbox
            icon-size="15px"
            v-model="hexTypeShowText"
            @change="hexTypeShowTextChange"
          >
            <span>文本查看辅助</span>
          </van-checkbox>
        </div>

        <!-- 文本显示格式选项 -->
      </div>
      <div class="rxcount-show-container">已接收：{{(uartStatus.rxStatus || {}).rxCount || 0}}</div>
      <div class="rxdata-operator-container">
        <van-button
          @click="pauseReflashNewRx"
          size="mini"
          :type="reflashNewRx ? 'danger' : 'primary'"
          :icon="reflashNewRx ? 'x fa fa-pause' : 'x fa fa-play'"
          >{{ reflashNewRx ? "暂停" : "继续" }}更新</van-button
        >
        <van-button
          @click="clearRxCache"
          size="mini"
          type="danger"
          icon="x fa fa-trash-o"
          >清空接收记录</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import index from "./index.js";
export default index;
</script>
<style lang="css" src="./index.css" scoped />