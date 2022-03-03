<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";

const state = reactive({
  displayForm: false,
  displayDelete: false,
});

const tableData = ref([]);
const hidden = ref({ user: "", pwd: "" });

onMounted(() => {
  getTable();
});

const getTable = async () => {
  let res = await axios.get("/ache/visit/get");
  tableData.value = res.data;
};

const deleteVisit = async (data) => {
  console.log(data);
  await axios.post("/ache/visit/delete", data);
};

const showLogin = () => {
  state.displayForm === true
    ? (state.displayForm = false)
    : (state.displayForm = true);
};

const login = () => {
  if (hidden.value.user === "zhang_gm" && hidden.value.pwd === "e1710121399") {
    state.displayDelete = true;
    state.displayForm = false;
    getTable();
  }
};
</script>

<template>
  <h1 @click="showLogin">近期访客</h1>

  <el-form :inline="true" :model="hidden" v-if="state.displayForm">
    <el-form-item label="账号">
      <el-input v-model="hidden.user"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="hidden.pwd"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登陆</el-button>
    </el-form-item>
  </el-form>

  <div>
    <el-table :data="tableData" stripe style="width: 100%" height="480">
      <el-table-column type="index" label="#" width="50" align="center">
      </el-table-column>
      <el-table-column prop="time" label="时间" width="240"> </el-table-column>
      <el-table-column
        prop="os"
        label="操作系统"
        show-overflow-tooltip
        width="320"
      >
      </el-table-column>
      <el-table-column prop="screen" label="屏幕分辨率" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="100" v-if="state.displayDelete">
        <template #default="scope">
          <el-button size="small" type="danger" @click="deleteVisit(scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div class="test" style="transform: translateY(96px); display: none"></div>
</template>

<style scoped>
.test {
  position: absolute;
  top: 18px;
  left: 38px;
  width: 2px;
  height: 14px;
  border-radius: 2px;
  background: #3053ea;
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
