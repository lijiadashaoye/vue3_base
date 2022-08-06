<script setup>
import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
function routeChange(str) {
  if (str === "two") {
    router.push({
      name: str,
      query: { obj1: JSON.stringify({ kk: 3 }), str: "str" },
      params: { obj2: JSON.stringify({ kk: 4 }), num: 5 },
    });

    // 命名的路由，并加上参数，让路由建立 url
    // router.push({ name: str, params: { username: "eduardo" } });
    // 带查询参数，结果是 /register?plan=private
    // router.push({ path: `/${str}`, query: { plan: "private" } });
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
