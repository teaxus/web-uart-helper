<template>
  <div class="studio-container">
    <van-button type="default" size="mini" icon="x fa fa-database" @click="addOneByteItemAction()">
      添加1Byte数据
    </van-button>
    <ul class="bytes-container">
      <li v-for="item, index in arrByteItem">
        <div>
          <p>第{{ index }}个Byte数据设定</p>
          <van-radio-group v-model="radio">
            <van-radio name="staticVal">
              <div class="van-radio-item">
                <div class="radio-title">固定</div>
                <div class="radio-text-field">
                  <van-field v-if="radio == 'staticVal'" class="radio-text-field" v-model="value"
                    placeholder="请输入1字节固定数值(必须是16进制)" />
                </div>
              </div>
            </van-radio>
            <van-radio name="calByte">
              <div class="van-radio-item">
                <div class="radio-title">运算</div>
                <van-button v-if="radio == 'calByte'" size="mini" @click="openCalSettingModeAction">设置</van-button>
              </div>
            </van-radio>
          </van-radio-group>
        </div>
      </li>
    </ul>



    <van-popup v-model="openCalSettingMode" closeable :round="true">
      <div class="cal-config-container">
        <div class="cal-config-title">运算配置</div>
        <div class="show-cal-sequence">
          <h4>运算方式</h4>
          <van-radio-group v-model="calRadio">
            <van-radio name="calByteLength">长度计算</van-radio>
            <van-radio name="calByteCRC8">CRC8</van-radio>
            <van-radio name="calByteCRC16">CRC16</van-radio>
          </van-radio-group>
        </div>
        <div>
          <h4><span style="margin-right: 10px;">请有序地选择运算的Byte</span>
            <van-button type="danger" size="mini" icon="x fa fa-window-close" @click="cleanCalSelectBytes">
              清空
            </van-button>
          </h4>
          <van-checkbox-group v-model="selectCalByte">
            <van-checkbox v-for="item in arrByteItem" :key="item.index" :name="item.index" shape="square">
              第{{ item.index }}个
            </van-checkbox>
          </van-checkbox-group>
        </div>
        <div v-if="selectCalByte.length != 0" class="show-cal-sequence">
          <h4>当前选择运算Byte的顺序</h4>
          <ul>
            <li v-for="item in selectCalByte" :key="item.index">{{ item }}</li>
          </ul>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import index from "./index.js";
export default index;
</script>
<style lang="less" src="./index.less" />