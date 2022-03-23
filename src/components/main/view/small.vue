<script setup>
import Calendar from "../calendar/index.vue";
import Collapse from "../collapse/index.vue";
</script>

<template>
  <div style="padding: 16px">
    <Calendar></Calendar>
    <Collapse></Collapse>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-calendar) {
  margin-bottom: 16px;
}
</style>
