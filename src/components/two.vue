<template>
  <p></p>
  <button @click="toCommit">状态管理：{{ store.state.count }}</button>
  <button @click="testAxios1">使用getCurrentInstance</button>
  <button @click="testAxios2">使用 provide/inject</button>
</template>

<script setup>
import { getCurrentInstance, inject } from "vue";
import { useStore } from "vuex";
let store = useStore();
function toCommit() {
  store.commit("increment");
}
// 使用自定义全局变量方式一
let {
  proxy: { $axios: axios },
} = getCurrentInstance();
function testAxios1() {
  let url =
    "https://pss.bdstatic.com/r/www/cache/static/protocol/https/amd_modules/@baidu/haokan-art-player_dfaf9be.js";
  axios.get(url).then((res) => {
    console.log(res);
  });
}
// 使用自定义全局变量方式二
const $axios = inject("$axios");
function testAxios2() {
  let url =
    "https://pss.bdstatic.com/r/www/cache/static/protocol/https/amd_modules/@baidu/haokan-art-player_dfaf9be.js";
  $axios.get(url).then((res) => {
    console.log(res);
  });
}
</script>

<style scoped>
</style>