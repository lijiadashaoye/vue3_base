<script setup>
import oneChild from "./oneChild.vue";
import { watch, ref, reactive } from "vue";
let obj = reactive({
    job: {
      one: 7,
    },
  }),
  num = ref(0);
// watch监听
function changeNum() {
  num.value++;
}
watch(num, () => {
  console.log(num.value);
});

function changeObjOne() {
  obj.job.one++;
}
// 只要obj里任何属性发生变化，都会执行
// watch(obj, () => {
//   console.log(obj.age);
// });
// 指定监听，只有这个属性值发生变动才会执行
watch(
  () => obj.job.one,
  () => {
    console.log(obj.job.one);
  }
);
// 监听子组件emit
let getEmitData = ref(null);
function childEmit(val) {
  getEmitData.value = val.emitData;
}
// 父组件调用子组件的方法
let child = ref("");
</script>

<template>
  <oneChild ref="child" msg="Vite + Vue" @self="childEmit" />
  <p>emitData：{{ getEmitData }}</p>
  <hr />
  <button @click="changeNum">num：{{ num }}</button>
  <button @click="changeObjOne">obj.job.one：{{ obj.job.one }}</button>
  <hr />
  <p>{{ child.childData }}</p>
  <button @click="child.childFn">调用子组件方法</button>
</template>

<style scoped>
button {
  margin-right: 10px;
}
</style>
