<script setup>
import { reactive } from "vue";

const props = defineProps({
  words: Object,
});

const state = reactive({
  value: new Date(),
  activeName: "1",
});
</script>

<template>
  <div style="padding: 8px">
    <el-collapse
      v-model="state.activeName"
      accordion
      v-for="(word, index) in props.words"
      :key="word"
    >
      <el-collapse-item :title="word.zhcn" :name="index">
        <div>
          {{ word.enus }}
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-calendar v-model="state.value"></el-calendar>
  </div>
</template>

<style scoped lang="scss">
@import "../../style/main.scss";
.el-calendar {
  margin-top: 16px;
}
</style>
