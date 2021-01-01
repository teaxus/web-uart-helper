<template>
  <div>
    <div style="show-type-select-container">
      <div @click="showType=1" :class="showType == 1 ? 'show-type-select-item-select':''" class="show-type-select-item">16进制文字混合</div>
      <div @click="showType=2" :class="showType == 2 ? 'show-type-select-item-select':''" class="show-type-select-item">单纯显示16进制</div>
      <div @click="showType=3" :class="showType == 3 ? 'show-type-select-item-select':''" class="show-type-select-item">单纯显示文字</div>
    </div>
    <div class="data-container">
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
            <th v-if="showType == 1"/>
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
              <div v-if="showType == 1" class="table-data-tail">{{ item.join("") }}</div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 单纯显示文字 -->
      <div v-else-if="showType == 3">
        <pre>
        {{ rxData }}
      </pre
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
