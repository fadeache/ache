<script setup>
import axios from "axios";
import { computed, onMounted, reactive, ref, nextTick } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  words: Object,
});

const state = reactive({
  value: new Date(),
  activeName: "1",
  schedules: [],
  showDialog: false,
  dialogTitle: "添加日程",
  dialogMode: "编辑日程",
});

const form = ref(null);
const formKey = ref(0);

onMounted(async () => {
  updateSchedules();
});

const updateSchedules = async () => {
  let res = await axios.get("ache/calendar/get");
  state.schedules = res.data;
};

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

const operateSchedule = (mode) => {
  form.value.validate(async (valid, fields) => {
    if (valid) {
      mode === "add"
        ? await axios.post("/ache/calendar/add", aSchedule.value)
        : await axios.put("/ache/calendar/edit", aSchedule.value);
      updateSchedules();
      state.showDialog = false;
    }
  });
};
const aSchedule = ref({
  date: "",
  event: "",
  completed: "0",
});
const deleteSchedule = async (id) => {
  await axios.delete("/ache/calendar/delete", { params: { id: parseInt(id) } });
  updateSchedules();
};

const displayDialog = (title, mode, data) => {
  state.dialogTitle = title;
  state.dialogMode = mode;
  if (mode === "add") {
    clearASchedule();
    nextTick(() => {
      if (form.value) {
        form.value.resetFields();
      }
    });
    formKey.value++;
  } else {
    aSchedule.value = data;
  }
  state.showDialog = true;
};

const clearASchedule = () => {
  aSchedule.value = {
    date: "",
    event: "",
    completed: "0",
  };
};

const rules = reactive({
  date: [{ required: true, message: "请选择日期", trigger: ["change"] }],
  event: [{ required: true, message: "请输入待办事件", trigger: ["change"] }],
});
</script>

<template>
  <div style="padding: 16px">
    <div
      class="addBtn gm"
      v-if="store.state.user.info.role === 'admin'"
      @click="displayDialog('添加日程', 'add')"
    >
      添加日程
    </div>
    <el-calendar v-model="state.value"
      ><template #dateCell="{ data }">
        <el-popover
          placement="top-start"
          trigger="hover"
          v-if="getSchedules(data).length"
          width="auto"
        >
          <li v-for="item in getSchedules(data)">
            {{ item.event
            }}<span
              class="gm"
              style="float: right"
              v-if="store.state.user.info.role === 'admin'"
              @click="deleteSchedule(item.id)"
              >delete</span
            ><span
              class="gm"
              style="margin: 0 8px; float: right"
              v-if="store.state.user.info.role === 'admin'"
              @click="displayDialog('编辑日程', 'edit', item)"
              >edit</span
            ><span v-if="item.completed === '1'" style="float: right">✔️</span>
          </li>
          <template #reference>
            <div class="hasSchedules">
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

  <el-dialog v-model="state.showDialog" custom-class="my-dialog smallSchedule">
    <template #title>
      <span>{{ state.dialogTitle }}</span>
    </template>
    <el-form :model="aSchedule" ref="form" :rules="rules" :key="formKey">
      <el-form-item label="日期" prop="date">
        <el-date-picker
          :editable="false"
          v-model="aSchedule.date"
          type="date"
          placeholder="选择日期"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="事件" prop="event">
        <el-input
          type="textarea"
          :rows="2"
          v-model="aSchedule.event"
          maxlength="255"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="是否完成" prop="completed">
        <el-select v-model="aSchedule.completed">
          <el-option label="待完成" value="0"> </el-option>
          <el-option label="完成" value="1"> </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="operateSchedule(state.dialogMode)">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
@import "../../style/main.scss";
:deep(.el-calendar) {
  margin-bottom: 16px;
  .el-calendar-day {
    height: 56px;
    div {
      height: 100%;
      width: 100%;
      line-height: 40px; // 或者通过行高来使元素垂直居中避免使用flex
      // display: flex; // 加个span就可以避免父元素flex导致的伪元素不同机型不统一问题
      // justify-content: center;
      // align-items: center;
    }
    .hasSchedules::before {
      content: "";
      position: absolute;
      width: 19px;
      height: 2px;
      background: #409eff;
      margin-top: 36px;
      // margin-top: 28px;
      margin-left: 0;
    }
  }
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
.addBtn {
  position: absolute;
  z-index: 10;
}
</style>
