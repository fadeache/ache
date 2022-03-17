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
  <div style="padding: 8px 8px 80px 8px">
    <el-calendar v-model="state.value"></el-calendar>
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
  </div>
</template>

<style scoped lang="scss">
@import "../../style/main.scss";
.el-calendar {
  margin: 16px 0;
}
</style>
