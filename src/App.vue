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
  <button @click="routeChange('one')">one</button>
  <button @click="routeChange('two')">two</button>
  <router-view></router-view>
</template>

<style>
button {
  margin-right: 10px;
}
</style>
