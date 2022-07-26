<script setup>
import { reactive } from "vue";
import words from "../../../../words-sad.json";

const state = reactive({
  activeName: "1",
});
</script>

<template>
  <el-collapse
    v-model="state.activeName"
    accordion
    v-for="(word, index) in words"
    :key="word"
  >
    <el-collapse-item :title="word.zhcn" :name="(index + 1).toString()">
      <div>
        {{ word.enus }}
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<style scoped lang="scss">
.el-collapse {
  border: none;

  :deep(.el-collapse-item__header) {
    line-height: normal;
    text-align: left;
    border: none;
  }
  :deep(.el-collapse-item__wrap) {
    border: none;

    .el-collapse-item__content {
      color: #677383;
      font-family: "Times New Roman", Times, serif;
      font-style: italic;
    }
  }
}
</style>
