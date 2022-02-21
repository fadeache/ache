<script setup>
import Menu from "./components/menu.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <el-container>
    <el-aside>
      <Menu></Menu>
    </el-aside>
    <el-main :style="`padding: ${route.path === '/blog' ? '48px' : ''} `">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style lang="scss">
#app {
  margin-top: 16px;
}
.el-container {
  width: 1280px;
  margin: auto;
  .el-aside {
    margin-right: 16px;
  }
  .el-main {
    background: #fff;
    padding: 148px 48px;
    min-height: 735px;
  }
}
</style>
