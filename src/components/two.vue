<template>
  <div>
    <button @click="toCommit">状态管理：{{ store.state.count }}</button>
    <p>axios 使用</p>
    <button @click="testAxios1">使用getCurrentInstance</button>
    <button @click="testAxios2">使用 provide/inject</button>
    <hr />
    <h3>服务器推送</h3>
    <p>{{ sseData }}</p>
    <button @click="useSSE">使用</button>
  </div>
</template>

<script setup>
import { getCurrentInstance, inject, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
// 获取路由参数
// let { query: query1, params: params1 } = useRoute();
// console.log(query1);
// console.log(params1);
// let { query, params } = useRoute();
// console.log(query);
// console.log(params);

// // 将路由参数作为组件props，需要在路由配置文件里添加props配置项
// let { query: query2, params: params2 } = defineProps({
//   query: Object,
//   params: Object,
// });
// console.log(query2);
// console.log(params2);

let store = useStore();
function toCommit() {
  store.commit("increment");
  console.log(store.state.isModule); // 命名空间
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
let sseData = ref("");
function useSSE() {
  let es = new EventSource("/sse");
  es.onmessage = (e) => {
    sseData.value = JSON.parse(e.data).name;
    es.close();
  };
}
</script>


<style scoped>
div {
  padding: 10px;
}
</style>