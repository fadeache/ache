<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import menu from "../../menu.json";
const route = useRoute();
const activeIndex = ref();
const isFixed = ref(false);
watch(
  () => route.matched,
  (newValue, oldValue) => {
    activeIndex.value = newValue[newValue.length - 1].path;
  }
);
onMounted(() => {
  window.addEventListener("scroll", watchScroll, true);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", watchScroll, true);
});
const watchScroll = () => {
  let scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  let offsetTop = document.querySelector(".nav").offsetTop + 272;
  if (scrollTop >= offsetTop) {
    console.log(scrollTop, offsetTop);
    isFixed.value = true;
  } else {
    isFixed.value = false;
  }
};
const jump = (address) => {
  if (address === "gitee") {
    window.open("https://gitee.com/fadeache");
  } else {
    window.open("https://blog.csdn.net/bDreamer");
  }
};
</script>

<template>
  <div class="brand">
    <h1>☀</h1>
    <span>轻松点，这一生，就当来旅游</span>
  </div>
  <div class="nav">
    <el-menu default-active="/" router>
      <template v-for="item in menu">
        <template v-if="item.children?.length">
          <el-sub-menu :key="item.name" :index="item.router">
            <template #title>
              <i :class="item.icon"></i>
              <span class="title">{{ item.title }}</span>
            </template>
            <el-menu-item
              class="el-menu-item"
              v-for="sub in item.children"
              :key="sub.name"
              :index="item.router + sub.router"
            >
              <i :class="sub.icon"></i>
              <span class="title">{{ sub.title }}</span>
            </el-menu-item>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item
            class="el-menu-item"
            :key="item.name"
            :index="item.router"
          >
            <i :class="item.icon"></i>{{ item.title }}</el-menu-item
          >
        </template>
      </template>
    </el-menu>
  </div>
  <div class="info" :class="{ infoFixed: isFixed }">
    <div class="author-vx">
      <img src="../assets/vx.png" />
    </div>
    <div class="author-name">
      <strong>zhang</strong>
    </div>
    <div class="links">
      <div @click="jump('gitee')">
        <img src="../assets/gitee.png" /><span>Gitee</span>
      </div>
      <div @click="jump('csdn')">
        <img src="../assets/csdn.png" /><span>CSDN</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.brand {
  height: 100px;
  padding: 24px 0;
  background-color: #222;
  color: #fff;
  span {
    color: #ddd;
  }
}
.nav {
  background-color: #fff;
  height: 240px;
  padding: 24px 0;
  text-align: left;
  overflow: auto;
  :deep(.el-menu) {
    border: none;

    .el-menu-item,
    .el-sub-menu__title {
      height: 48px;
      line-height: 48px;
      color: #888;
      &:hover {
        color: #000;
        background-color: #f1f1f1;
      }
      i {
        vertical-align: -8%;
      }
    }
    .el-sub-menu__title * {
      vertical-align: baseline;
    }
    .is-active:not(.el-sub-menu) {
      background-color: #f1f1f1;
      color: #000;
    }
  }
}
.info {
  padding: 24px 16px;
  background-color: #fff;
  margin-top: 8px;
  .author-vx {
    img {
      width: 160px;
      height: 160px;
      border: 1px #f1f1f1 solid;
    }
  }
  .links {
    margin-top: 24px;
    display: flex;
    justify-content: space-evenly;
    div {
      height: 32px;
      width: 35%;
      padding: 7px 16px;
      box-sizing: border-box;
      text-align: left;
      border: 1px transparent solid;
      border-radius: 4px;
      &:hover {
        border: 1px #ddd solid;
        cursor: pointer;
      }
      img {
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }
      span {
        font-size: 12px;
        vertical-align: top;
      }
    }
  }
}
.infoFixed {
  width: 300px;
  position: fixed;
  z-index: 2021;
  top: 0;
  box-sizing: border-box;
}
</style>
