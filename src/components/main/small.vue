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
  <div style="padding: 16px">
    <el-calendar v-model="state.value"></el-calendar>
    <el-collapse
      v-model="state.activeName"
      accordion
      v-for="(word, index) in props.words"
      :key="word"
    >
      <el-collapse-item :title="word.zhcn" :name="(index + 1).toString()">
        <div>
          {{ word.enus }}
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style scoped lang="scss">
@import "../../style/main.scss";
:deep(.el-calendar) {
  margin-bottom: 16px;
}

:deep(.el-collapse) {
  border: none;
  .el-collapse-item__header {
    line-height: normal;
    text-align: left;
    border: none;
  }
}
</style>
