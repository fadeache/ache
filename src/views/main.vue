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
  <h1>床前明月光，</h1>
  <h1>疑是地上霜。</h1>
  <h1>举头望明月，</h1>
  <h1>低头思故乡。</h1>
</template>

<style scoped></style>
