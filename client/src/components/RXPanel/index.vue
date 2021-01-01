<template>
  <div>
    <div class="data-container">
      <table class="table-contain">
        <thead>
          <tr>
            <th>
              <div class="table-header"></div>
            </th>
            <th v-for="item in headRow" :key="item">
              <div>
                {{prefixZero(item.toString(16).toUpperCase(),2)}}
              </div>
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in showDataArrs" :key="i">
            <td>
              <div class="table-header">{{prefixZero(i.toString(16).toUpperCase(),8)}}:</div>
            </td>
            <td v-for="(data,k) in item" :key="i+k">
              <div class="table-data">{{data == "" ? "":data.charCodeAt().toString(16).toUpperCase()}}</div>
            </td>
            <td>
              <div class="table-data-tail">{{item.join("")}}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import index from "./index.js";
export default index;
</script>
<style lang="css" src="./index.css" scoped />
