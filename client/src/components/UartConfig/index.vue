<template>
  <div>
    <van-popup v-model="popupShow" closeable :round="true">
      <div class="config-container">
        <div class="config-title">端口连接配置</div>
        <van-cell-group>
          <van-field v-model="serialPortConnectConfig.connectPortName" label="端口" placeholder="请选择端口" readonly>
            <template #button>
              <van-button size="small" type="info" @click="startSelectData('port')">选择</van-button>
            </template>
          </van-field>
          <van-field label="波特率" type="number" v-model="serialPortConnectConfig.baudRate" placeholder="请输入或选择波特率">
            <template #button>
              <van-button size="small" type="info" @click="startSelectData('baudRate')">选择</van-button>
            </template>
          </van-field>
          <van-field label="校验位" v-model="serialPortConnectConfig.parity" placeholder="请选择校验位" readonly>
            <template #button>
              <van-button size="small" type="info" @click="startSelectData('parity')" readonly>选择</van-button>
            </template>
          </van-field>
          <van-field label="数据位" v-model="serialPortConnectConfig.dataBits" placeholder="请选择数据位" readonly>
            <template #button>
              <van-button size="small" type="info" @click="startSelectData('dataBits')" readonly>选择</van-button>
            </template>
          </van-field>
          <van-field label="停止位" v-model="serialPortConnectConfig.stopBits" placeholder="请选择停止位" readonly>
            <template #button>
              <van-button size="small" type="info" @click="startSelectData('stopBits')" readonly>选择</van-button>
            </template>
          </van-field>
        </van-cell-group>
      </div>
    </van-popup>

    <van-dialog v-model="showDialog" :title="selectTitle"
                @confirm="didSelect(true)" @cancel="didSelect(false)"
                confirm-button-color="rgb(7, 193, 96)"
                show-cancel-button>
      <van-picker :columns="selectData" ref="DataSelectPicker"/>
    </van-dialog>
  </div>
</template>

<script>
import index from "./index.js";
export default index;
</script>
<style lang="css" src="./index.css" scoped />
