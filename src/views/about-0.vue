<script setup>
import { reactive, ref } from "vue";
import axios from "axios";

const state = reactive({
  displayTitle: true,
  displayForm: false,
  displayData: false,
});
const hidden = ref({ user: "", pwd: "" });
const tableData = ref([]);

const getTable = async () => {
  let res = await axios.get("/ache/visit");
  tableData.value = res.data;
};

const display = () => {
  state.displayForm = true;
  state.displayTitle = false;
};
const login = () => {
  if (hidden.value.user === "zhang_gm" && hidden.value.pwd === "e1710121399") {
    state.displayData = true;
    state.displayForm = false;
    getTable();
  }
};
</script>

<template>
  <h1 @click="display" v-if="state.displayTitle">关于我是谁，双枪会给出答案</h1>

  <div>
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
  </div>

  <div v-if="state.displayData">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="time" label="时间"> </el-table-column>
      <el-table-column prop="os" label="操作系统"> </el-table-column>
      <el-table-column prop="browser" label="浏览器"> </el-table-column>
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
