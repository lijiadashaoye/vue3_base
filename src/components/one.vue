<script setup>
import {
  watch,
  ref,
  reactive,
  defineAsyncComponent,
  computed,
  onMounted,
} from "vue";
// 异步加载组件
let oneChild = defineAsyncComponent(() => import("./oneChild.vue"));
let num = ref(0);
// watch监听
function changeNum() {
  num.value++;
}
// watch(
//   num, // 指定ref()定义的值，不需要加value，但读取值时，需要加
//   () => {
//     console.log(num.value);
//   },
//   { immediate: true }
// );

let obj = reactive({
  age: 1,
  job: {
    one: 7,
  },
});
function changeObjOne() {
  obj.job.one++;
}
function changeObjOneAge() {
  obj.age++;
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
// 以数组形式指定监听多个属性
watch([() => obj.age, () => obj.job.one], (t) => {
  console.log(t);
});
// 监听子组件emit
let getEmitData = ref(null);
function childEmit(val) {
  getEmitData.value = val.emitData;
}
// 获取dom
// let wap = ref(null);
// onMounted(() => {
//   console.log(wap.value);
// });
// 父组件调用子组件的方法
let child = ref("");
let isMath = reactive({
  one: "",
  two: "",
  three: computed({
    // 第一种写法：用对象
    get() {
      if (isMath.one !== "" && isMath.two !== "") {
        return +isMath.one + +isMath.two;
      }
    },
  }),
  // three: computed(() => {  // 第二种写法：用箭头函数
  //   if (isMath.one !== "" && isMath.two !== "") {
  //     return +isMath.one + +isMath.two;
  //   }
  // }),
});
</script>

<template>
  <div ref="wap">
    <one-child ref="child" msg="Vite + Vue" @self="childEmit">
      <template #default>
        <span>默认插槽写法二，也可只用#替代#default</span>
      </template>
      <!-- <span>默认插槽写法一</span> -->
      <template #slotName="pp">
        <span>{{ pp.slotData.age }}</span>
      </template>
    </one-child>
    <p class="forEmit">
      emitData：<span>{{ getEmitData }}</span>
    </p>
    <hr />
    <button @click="changeNum">num：{{ num }}</button>
    <button @click="changeObjOne">obj.job.one：{{ obj.job.one }}</button>
    <button @click="changeObjOneAge">
      obj.job.one和age：{{ obj.age }}--{{ obj.job.one }}
    </button>
    <hr />
    <p>{{ child.childData }}</p>
    <button @click="child.childFn">调用子组件方法</button>
    <hr />
    <h4>computed 使用</h4>
    <el-input
      style="width: 100px"
      v-model="isMath.one"
      placeholder="Please input"
    />
    +
    <el-input
      style="width: 100px"
      v-model="isMath.two"
      placeholder="Please input"
    />
    = {{ isMath.three }}
  </div>
</template>

<style scoped lang='scss'>
button {
  margin-right: 10px;
}
.forEmit {
  span: {
    color: blue;
  }
}
</style>
