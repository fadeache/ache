<script setup>
import Menu from "./components/menu/menu.vue";
import Small from "./components/menu/small.vue";
import { useRoute } from "vue-router";
import { onBeforeUnmount, ref, onBeforeMount } from "vue";
const route = useRoute();

onBeforeMount(() => {
  renderResize();
  window.addEventListener("resize", renderResize);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", renderResize);
});
const smallScreen = ref(false);
const renderResize = () => {
  let width = document.documentElement.clientWidth;
  if (width < 1229) {
    smallScreen.value = true;
    document.getElementsByTagName("body")[0].style.backgroundColor = "#fff";
  } else {
    smallScreen.value = false;
    document.getElementsByTagName("body")[0].style.backgroundColor = "#f5f7f9";
  }
};
</script>

<template>
  <el-container :class="[smallScreen ? 'smallContainer' : 'bigContainer']">
    <el-aside v-if="!smallScreen">
      <Menu></Menu>
    </el-aside>
    <el-main>
      <Small v-if="smallScreen"></Small>
      <router-view :smallScreen="smallScreen"></router-view>
    </el-main>
  </el-container>
</template>

<style lang="scss">
#app {
  margin-top: 16px;
}
.bigContainer {
  width: 1280px;
  margin: auto;
  .el-aside {
    margin-right: 16px;
  }
  .el-main {
    background: #fff;
    padding: 48px !important;
    min-height: 735px;
  }
}
.smallContainer {
  .el-main {
    margin-top: -16px;
    background: #fff;
    padding: 0;
  }
}
.bodyBg {
  background: #fff;
}
</style>
