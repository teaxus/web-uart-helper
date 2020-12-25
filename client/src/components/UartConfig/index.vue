<template>
  <div>
    <van-popup v-model="popupShow" closeable :round="true">
      <div class="config-container">
        <div class="config-title">端口连接配置</div>
        <van-cell-group>
          <van-field v-model="serialPortConnectConfig.connectPortName" label="端口" placeholder="请选择端口" readonly>
            <template #button>
              <van-button size="small" type="info">选择</van-button>
            </template>
          </van-field>
          <van-field label="波特率" type="number" v-model="serialPortConnectConfig.baudRate" placeholder="请输入或选择波特率">
            <template #button>
              <van-button size="small" type="info">选择</van-button>
            </template>
          </van-field>
          <van-field label="校验位" placeholder="请选择校验位" readonly>
            <template #button>
              <van-button size="small" type="info" readonly>选择</van-button>
            </template>
          </van-field>
          <van-field label="停止位" placeholder="请选择停止位" readonly>
            <template #button>
              <van-button size="small" type="info" readonly>选择</van-button>
            </template>
          </van-field>
        </van-cell-group>
      </div>
    </van-popup>

    <van-dialog v-model="showDialog" title="标题"
                confirm-button-color="rgb(7, 193, 96)"
                show-cancel-button>
      <van-picker :columns="columns" />
    </van-dialog>
  </div>
</template>

<script>
import index from "./index.js";
export default index;
</script>
<style lang="css" src="./index.css" scoped />
