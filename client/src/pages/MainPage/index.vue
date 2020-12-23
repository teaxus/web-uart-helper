<template>
  <div class="main-page-container">
    <sidebar-menu
      :collapsed="min_silder_bar"
      :menu="menu"
      @toggle-collapse="onToggleCollapse"
      width="226px"
    >
      <span slot="toggle-icon">
        <i class="fa fa-arrows-h" aria-hidden="true"></i>
      </span>
      <template slot="opencontrol" slot-scope="scope">
        <div
          :style="scope.show ? 'display: flex' : 'display: none'"
          class="main-func-item"
        >
          <van-switch
            v-model="uart_is_opened"
            active-color="#07c160"
            inactive-color="#ee0a24"
          />
          <div class="data-tran-status">
            <div id="chartLineBox" style="width: 100%; height: 100%" />
            <div v-if="uart_is_opened == false" class="data-tran-status-mask">
              端口已关闭
            </div>
          </div>
        </div>
        <div
          :style="!scope.show ? 'display: flex' : 'display: none'"
          class="main-func-item-minify"
          @click="uart_is_opened = !uart_is_opened"
        >
          <i v-if="uart_is_opened == false">
            <svg
              t="1608738839694"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2023"
              width="30"
              height="30"
            >
              <path
                d="M652.899 189.266c-16.036-7.058-34.761 0.22-41.82 16.258-7.059 16.038 0.221 34.761 16.258 41.819 104.649 46.06 172.27 149.682 172.27 263.991 0 77-29.986 149.392-84.434 203.839s-126.839 84.434-203.839 84.434-149.393-29.986-203.84-84.434c-54.448-54.447-84.433-126.839-84.433-203.839 0-114.963 68.159-218.821 173.642-264.591 16.075-6.975 23.451-25.659 16.477-41.733-6.975-16.075-25.662-23.452-41.734-16.477-128.688 55.837-211.839 182.544-211.839 322.8 0 47.469 9.304 93.535 27.653 136.917 17.717 41.887 43.073 79.499 75.365 111.791 32.292 32.291 69.903 57.647 111.791 75.364 43.383 18.35 89.449 27.653 136.918 27.653 47.468 0 93.535-9.304 136.917-27.653 41.888-17.717 79.499-43.073 111.791-75.364 32.291-32.292 57.647-69.904 75.364-111.791 18.35-43.383 27.653-89.448 27.653-136.917 0.001-139.458-82.493-265.877-210.16-322.067z"
                fill="#ffffff"
                p-id="2024"
              ></path>
              <path
                d="M512 479.517c17.522 0 31.727-14.205 31.727-31.727V128.228c0-17.522-14.204-31.727-31.727-31.727s-31.727 14.205-31.727 31.727V447.79c0 17.522 14.205 31.727 31.727 31.727z"
                fill="#ffffff"
                p-id="2025"
              ></path>
            </svg>
          </i>
          <i v-else>
            <svg
              t="1608738839694"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2023"
              width="30"
              height="30"
            >
              <path
                d="M652.899 189.266c-16.036-7.058-34.761 0.22-41.82 16.258-7.059 16.038 0.221 34.761 16.258 41.819 104.649 46.06 172.27 149.682 172.27 263.991 0 77-29.986 149.392-84.434 203.839s-126.839 84.434-203.839 84.434-149.393-29.986-203.84-84.434c-54.448-54.447-84.433-126.839-84.433-203.839 0-114.963 68.159-218.821 173.642-264.591 16.075-6.975 23.451-25.659 16.477-41.733-6.975-16.075-25.662-23.452-41.734-16.477-128.688 55.837-211.839 182.544-211.839 322.8 0 47.469 9.304 93.535 27.653 136.917 17.717 41.887 43.073 79.499 75.365 111.791 32.292 32.291 69.903 57.647 111.791 75.364 43.383 18.35 89.449 27.653 136.918 27.653 47.468 0 93.535-9.304 136.917-27.653 41.888-17.717 79.499-43.073 111.791-75.364 32.291-32.292 57.647-69.904 75.364-111.791 18.35-43.383 27.653-89.448 27.653-136.917 0.001-139.458-82.493-265.877-210.16-322.067z"
                fill="#07C160"
                p-id="2024"
              ></path>
              <path
                d="M512 479.517c17.522 0 31.727-14.205 31.727-31.727V128.228c0-17.522-14.204-31.727-31.727-31.727s-31.727 14.205-31.727 31.727V447.79c0 17.522 14.205 31.727 31.727 31.727z"
                fill="#07C160"
                p-id="2025"
              ></path>
            </svg>
          </i>
        </div>
      </template>
      <template slot="config" slot-scope="scope">
        <div v-if="scope.show" class="main-func-item">
          <van-button
            style="text-align: left"
            size="small"
            icon="x fa fa-wrench"
            type="info"
            icon-position="right"
            :disabled="uart_is_opened"
          >
            <div style="margin-right: 5px">
              <div><span>端口:xxxxxxxx/波特率:96000</span></div>
              <div>
                <span>校验位:None/数据位:8/停止位:1</span>
              </div>
            </div>
          </van-button>
        </div>
        <div v-else class="main-func-item-minify">
          <sidebar-menu-icon icon="fa fa-wrench" />
        </div>
      </template>
    </sidebar-menu>
    <div></div>

    <!-- <div class="uart-config-container"> 
      <uart-config ref="UartConfig" />
    </div> -->
  </div>
</template>

<script>
import index from "./index.js";
export default index;
</script>
<style lang="css" src="./index.css" scoped />
