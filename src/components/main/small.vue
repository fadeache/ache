<script setup>
import axios from "axios";
import { computed, onMounted, reactive } from "vue";

const props = defineProps({
  words: Object,
});

const state = reactive({
  value: new Date(),
  activeName: "1",
  schedules: [],
});

onMounted(async () => {
  let res = await axios.get("ache/calendar/get");
  state.schedules = res.data;
});

const getSchedules = computed(() => {
  return function (data) {
    let theDay = [];
    state.schedules.find((item) => {
      if (item.date === data.day) {
        theDay.push(item);
      }
    });
    return theDay;
  };
});
</script>

<template>
  <div style="padding: 16px">
    <el-calendar v-model="state.value"
      ><template #dateCell="{ data }">
        <el-popover
          placement="top-start"
          trigger="click"
          v-if="getSchedules(data).length"
          width="auto"
        >
          <li v-for="item in getSchedules(data)">
            {{ item.event
            }}<span v-if="item.completed" style="float: right">✔️</span>
          </li>
          <template #reference>
            <div>
              {{ data.day.split("-").slice(2).join("") }}
            </div>
          </template>
        </el-popover>
        <div v-else>
          {{ data.day.split("-").slice(2).join("") }}
        </div>
      </template></el-calendar
    >
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
  .el-collapse-item__wrap {
    border: none;
  }
}
</style>
