<script setup>
import Menu from "./components/menu.vue";
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
  if (width < 1280) {
    smallScreen.value = true;
  } else {
    smallScreen.value = false;
  }
};
</script>

<template>
  <el-container
    :class="{ bigContainer: !smallScreen }"
    style="background: #fff"
  >
    <el-aside v-if="!smallScreen">
      <Menu></Menu>
    </el-aside>
    <el-main
      :style="`padding: ${
        route.path === '/word' || route.path === '/animation'
          ? '148px 48px'
          : ''
      } `"
    >
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
    padding: 48px;
    min-height: 735px;
  }
}
</style>
