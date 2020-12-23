<template>
  <div>
    <div>
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
    </div>

    <van-dialog v-model="show" title="标题" show-cancel-button>
      <van-picker :columns="columns" />
    </van-dialog>
  </div>
</template>

<script>
  import index from './index.js';
  export default index;
</script>
<style lang="css" src="./index.css" scoped />
