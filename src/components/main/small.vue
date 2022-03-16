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
  <el-row>
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
  </el-row>
</template>

<style scoped lang="scss">
:deep(.el-calendar) {
  margin-top: 16px;
  --el-calendar-header-border-bottom: transparent;
  .el-calendar__header {
    flex-direction: column;
    height: 56px;
    padding: 0;
  }
  .el-calendar__body {
    padding: 0;
    .el-calendar-day {
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
