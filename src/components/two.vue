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
    <div>
      <p>display:grid 学习</p>
      <div class="gridWap">
        <div class="one">
          <div>
            <h4 style="margin:3px 0">当父元素使用 didplay:grid</h4>
            <p>如果元素没设置box-sizing:border-box;则grid是以默认的box-sizing:content-box;为父元素grid尺寸划分</p>
            <p>在设置尺寸时，要注意margin、padding不计算在gridf尺寸内</p>
            <p>如果父元素设置了box-sizing:border-box;则在grid尺寸划分时，要包含border和padding尺寸</p>
          </div>
          <div>

            <p>grid-gap:10px;</p>
            <p>在grid计算尺寸时，不包含在grid计算尺寸内，grid-gap相当于给子元素添加了margin:10px</p>
          </div>
        </div>
        <div class="two autoFill fr area justify start">
          <p class="singleSet1">1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p class="singleSet2">5</p>
        </div>
      </div>
    </div>
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


<style scoped lang="scss">
.gridWap {
  height: 400px;
  display: grid;
  grid-template-columns: 70% 30%;
  padding: 10px;
  margin: 10px;
  background: rgb(238, 237, 237)
}

.one {
  background-color: aquamarine;
  margin: 10px;
  height: calc(100% - 20px);
  display: grid;
  grid-template-rows: 50% 50%;

  >div {
    height: 100%;
    box-sizing: border-box;
    border: 1px solid red
  }
}

.two {
  background-color: rgb(251, 216, 216);
  display: grid;

  // 先列后行自动填满父元素
  // grid-auto-flow:column dense;

  // 先行后列自动填满父元素
  // grid-auto-flow: row dense;

  >p {
    width: 100px;
    height: 50px;
    background-color: aqua;
    flex-shrink: 0;
    box-sizing: border-box;
    border: 1px solid red
  }
}

.autoFill {
  // 表示根据宽度以 20px 为尺寸，重复 auto-fill 次
  // repeat() 第一个参数为重复的次数，可以是具体的数字，也可以是auto-fill 自动按尺寸分割
  // repeat() 第二个参数为分割的尺寸
  // grid-template-columns: repeat(auto-fill, 20px);
}

.fr {
  /* 1fr+2fr=3fr，表示将父元素宽度设定为所有fr之和：3fr */
  // grid-template-columns: 1fr 2fr;

  /* fr与px搭配使用，表示content尺寸减去px值后的尺寸
     当做100%再进行fr尺寸分割，类似 calc(100% - 70px) */
  // grid-template-columns: 1fr 70px 1fr;

  /* 也可以使用auto关键字填充不确定尺寸的地方 */
  // grid-template-columns: auto 70px 100px;
}

.area {
  /* 以矩阵的方式分割 */
  // grid-template-areas: 'a b c' 'd e f' 'g h i';
}

.justify {
  // justify-content: center;
  // align-content: center;

  /* 统一设置容器的每个格的内容编排 */
  justify-items: center;
  align-items: center;
}

.start {
  /* 表示网格的起始点从父元素第几条边开始 */
  grid-column-start: 2;
  grid-row-start: 1;
}

.two .singleSet1 {
  justify-self: end;
  align-self: end;
}

.two .singleSet2 {
  background-color: rgb(109, 193, 68);
  width: 100%;

  /* 设置单元格跨格 */
  // 写法一:
  // grid-column: 1 / span 3;

  // 写法二: 
  grid-column-start: 1;
  grid-column-end: 3;
}
</style>