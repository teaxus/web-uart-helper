<template>
  <div class="txpanel-container">
    <div class="data-input-container">
      <textarea v-model="inputData" @input="inpuDataChange" />
    </div>

    <!-- 工具栏 -->
    <div class="tools-box-container">
      <div>
        <van-button
          @click="sendData"
          type="primary"
          style="height: 54px"
          icon="x fa fa-paper-plane-o"
          >发送</van-button
        >
      </div>
      <div class="data-send-formatter-selector-container">
        <van-button
          :type="inputType == 'HEX' ? 'primary' : 'default'"
          size="mini"
          icon="x fa fa-database"
          @click="inputType = 'HEX'"
        >
          16进制
        </van-button>
        <van-button
          :type="inputType == 'TEXT' ? 'primary' : 'default'"
          size="mini"
          icon="x fa fa-file-text"
          @click="inputType = 'TEXT'"
        >
          字符串
        </van-button>
      </div>
      <div class="txcount-show-container">
        已接收：{{ (uartStatus.txStatus || {}).txCount || 0 }}
      </div>
      <div class="data-auto-send-container">
        <van-button
          size="mini"
          icon="x fa fa-database"
          @click="showAddAutoSendConfigFlag = true"
        >
          添加自动发送
        </van-button>
        <van-button
          @click="showAutoSendFlag = true"
          size="mini"
          icon="x fa fa-file-text"
        >
          查看自动发送
        </van-button>
      </div>
      <div class="txdata-operator-container">
        <van-button
          @click="checkTxRecord"
          size="mini"
          type="info"
          icon="x fa fa-search"
          >查看发送记录</van-button
        >
        <van-button
          @click="clearTxCache"
          size="mini"
          type="danger"
          icon="x fa fa-trash-o"
          >清空发送记录</van-button
        >
      </div>
    </div>

    <!-- 自动发送 Begin -->
    <div
      v-if="showAutoSendFlag"
      class="show-autosend-tx-container"
      :style="'height:' + (height - 19) + 'px'"
    >
      <div style="height: 80%; overflow: scroll; overflow-x: hidden">
        <table>
          <thead>
            <tr>
              <th style="padding-right: 15px">类型</th>
              <th style="padding-right: 15px">内容</th>
              <th style="padding-right: 15px">自动发送间隔</th>
              <th style="padding-right: 15px">发送次数</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(val, key) in autoSendMap" :key="key">
              <td style="padding-right: 15px">{{ key.split("|")[0] }}</td>
              <td
                style="
                  padding-right: 15px;
                  max-width: 250px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                "
              >
                {{ key.split("|")[1] }}
              </td>
              <td style="padding-right: 15px">
                <input
                  v-model="val.autoSendInterval"
                  @keyup.enter="autoSendConfigDidChange(key)"
                  style="color: black"
                  type="number"
                  placeholder="请输入(单位:ms,回车确定)"
                />
              </td>
              <td style="padding-right: 15px">{{ val.txCount }}</td>
              <td>
                <van-button v-if="val.sendStatus" type="info" @click="changeAutoStatus(key, false)" size="mini"
                  >停止</van-button
                >
                <van-button v-else type="warning" @click="changeAutoStatus(key, true)" size="mini"
                  >恢复</van-button
                >
                <van-button type="danger" @click="delAutoSend(key)" size="mini"
                  >删除</van-button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="position: absolute; left: 10px; bottom: 10px; width: 100%">
        <van-button
          style="display: flex; margin: auto"
          type="danger"
          @click="showAutoSendFlag = false"
          >关闭</van-button
        >
      </div>
    </div>
    <!-- 自动发送 End -->

    <van-popup v-model="showAddAutoSendConfigFlag" closeable :round="true">
      <div class="auto-pop-config-container">
        <div class="auto-pop-config-container-title">端口连接配置</div>
        <div>
          <van-cell-group>
            <van-field
              v-model="autoSendInterval"
              label="自动发送间隔"
              type="number"
              placeholder="请输入大于20ms(单位ms)"
            />
            <van-button type="primary" style="float: right;" @click="addAutoSendCommand" size="small"
              >添加</van-button>
          </van-cell-group>
        </div>
      </div>
    </van-popup>

    <!-- 发送记录  Begin -->
    <div
      v-if="showSendrecordFlag"
      class="show-tx-record-container"
      :style="'height:' + (height - 19) + 'px'"
    >
      <div style="height: 80%; overflow: scroll; overflow-x: hidden">
        <table>
          <thead>
            <tr>
              <th style="padding-right: 15px">类型</th>
              <th style="padding-right: 15px">内容</th>
              <th style="padding-right: 15px">次数</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(val, key) in sendRecord" :key="key">
              <td style="padding-right: 15px">{{ key.split("|")[0] }}</td>
              <td
                style="
                  padding-right: 15px;
                  max-width: 250px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                "
              >
                {{ key.split("|")[1] }}
              </td>
              <td style="padding-right: 15px">{{ val }}</td>
              <td>
                <van-button type="info" @click="resendData(key)" size="mini"
                  >重发</van-button
                >
                <van-button type="warning" @click="reinputData(key)" size="mini"
                  >回填</van-button
                >
                <van-button type="danger" @click="delRecord(key)" size="mini"
                  >删除</van-button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="position: absolute; left: 10px; bottom: 10px; width: 100%">
        <van-button
          style="display: flex; margin: auto"
          type="danger"
          @click="showSendrecordFlag = false"
          >关闭</van-button
        >
      </div>
    </div>
    <!-- 发送记录  End -->
  </div>
</template>
<script>
import index from "./index.js";
export default index;
</script>
<style lang="css" src="./index.css" scoped />