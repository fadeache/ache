<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const tableData = ref([]);

const getTable = async () => {
  let res = await axios.get("/ache/visit");
  tableData.value = res.data;
};

onMounted(() => {
  getTable();
});
</script>

<template>
  <h1>近期访客</h1>

  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" label="#" width="50" align="center">
      </el-table-column>
      <el-table-column prop="time" label="时间" width="240"> </el-table-column>
      <el-table-column
        prop="os"
        label="操作系统"
        width="360"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="browser" label="分辨率" show-overflow-tooltip>
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
