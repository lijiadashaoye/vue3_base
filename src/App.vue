<script setup>
import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
function routeChange(str) {
  if (str === "two") {
    router.push({
      name: str,
      query: { obj1: JSON.stringify({ kk: 3 }), str: "str" }, // 刷新不消失
      params: { obj2: JSON.stringify({ kk: 4 }), num: 5 }, // params 刷新后会消失
    });
  } else {
    router.push({ name: str });
  }
}
</script>


<template>
  <div>
    <button @click="routeChange('one')">one</button>
    <button @click="routeChange('two')">two</button>
    <el-button>I am ElButton</el-button>
    <Edit style="width: 1em; height: 1em; margin-right: 8px" />
    <!-- <router-view></router-view> -->
    <!-- 路由缓存化 -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>


<style>
button {
  margin-right: 10px;
}
</style>
