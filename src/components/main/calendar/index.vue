<script setup>
import axios from "axios";
import { computed, onMounted, reactive, ref, nextTick } from "vue";
import { useStore } from "vuex";

const store = useStore();

const state = reactive({
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
  completed: 0,
});
const deleteSchedule = async (id) => {
  await axios.delete("/ache/calendar/delete", { params: { id: parseInt(id) } });
  updateSchedules();
};

const displayDialog = (title, mode, data) => {
  state.dialogTitle = title;
  state.dialogMode = mode;
  if (mode === "add") {
    aSchedule.value = {
      date: "",
      event: "",
      completed: 0,
    };
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

const rules = reactive({
  date: [{ required: true, message: "请选择日期", trigger: ["blur"] }],
  event: [{ required: true, message: "请输入待办事件", trigger: ["blur"] }],
});
</script>

<template>
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
          ><span v-if="item.completed" style="margin-left: 8px">
            —{{ item.completed }}%</span
          >
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

  <el-dialog v-model="state.showDialog" custom-class="my-dialog schedule">
    <template #title>
      <span>{{ state.dialogTitle }}</span>
    </template>
    <el-form
      :model="aSchedule"
      ref="form"
      :rules="rules"
      :key="formKey"
      :label-width="52"
    >
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
      <el-form-item label="进度" prop="completed"
        ><el-slider
          style="margin: 1px 0 1px 5px"
          v-model="aSchedule.completed"
          :step="10"
      /></el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="operateSchedule(state.dialogMode)">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.el-calendar {
  --el-calendar-header-border-bottom: transparent;
  :deep(.el-calendar__header) {
    flex-direction: column;
    height: 56px;
    padding: 0;
  }
  :deep(.el-calendar__body) {
    padding: 0;
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
        width: 18px;
        height: 2px;
        background: #409eff;
        margin-top: 36px;
        // margin-top: 28px;
        margin-left: 0;
      }
    }
  }
}
.addBtn {
  position: absolute;
  z-index: 10;
}
</style>
