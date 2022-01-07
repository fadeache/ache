<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";

const state = reactive({
  quotations: "",
  type: "",
  tags: ["", "success", "info", "warning", "danger"],
  loading: false,
});
onMounted(() => {
  getTag();
});

const getTag = async () => {
  state.loading = true;
  state.quotations = await axios.get("api/SweetNothings");
  state.loading = false;
  let index = Math.floor(Math.random() * state.tags.length);
  state.type = state.tags[index];
};

const count = ref(0);
</script>

<template>
  <div v-loading="state.loading">
    <el-tag @close="getTag" closable :type="state.type">
      {{ state.quotations.data }}
    </el-tag>
  </div>
</template>

<style scoped></style>
