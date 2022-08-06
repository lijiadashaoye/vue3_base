<script setup>
import { ref } from "vue";
// defineExpose 用来定义当前组件暴露出去的属性或方法
let childData = ref("暴露的子组件属性");
function childFn() {
  childData.value = `暴露的子组件属性--${Math.trunc(Math.random() * 100)}`;
}
defineExpose({
  childFn,
  childData,
});
// defineProps用来获取组件传值 props
defineProps({
  msg: String,
});
// defineEmits用来定义哪些函数是emit事件
const emits = defineEmits(["self"]);
function emitFn() {
  emits("self", { emitData: Math.trunc(Math.random() * 100) });
}
</script>

<template>
  <div>
    <h4>父组件给子组件的props：{{ msg }}</h4>
    <button @click="emitFn">emitFn</button>
  </div>
</template>

<style scoped>
@media (min-width: 500px) {
  h4 {
    color: red;
  }
}
</style>
