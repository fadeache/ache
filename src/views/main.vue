<script setup>
import { reactive, onMounted } from "vue";
import axios from "axios";
const state = reactive({
  springBoot: "",
});
onMounted(() => {
  getSpringBoot();
});
const getSpringBoot = async () => {
  let res = await axios.get("/hello");
  state.springBoot = res.data;
};
</script>

<template>
  <h1>首页啥也没有</h1>
  <h1>{{ state.springBoot }}</h1>
</template>

<style scoped></style>
