<script setup>
import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
function routeChange(str) {
  router.push({ name: str });
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
