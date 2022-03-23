<script setup>
import { onBeforeUnmount, onMounted, ref, watch, reactive } from "vue";
import { useRoute } from "vue-router";
import menu from "../../../menu.json";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

const store = useStore();
const route = useRoute();
const activeIndex = ref();
const isFixed = ref(false);
const showDialog = ref(false);
const loginInfo = ref({
  user: "",
  pwd: "",
});
const form = ref(null);
const formKey = ref(0);
const rules = reactive({
  user: [{ required: true, message: "请输入用户", trigger: ["change"] }],
  pwd: [{ required: true, message: "请输入密码", trigger: ["change"] }],
});

watch(
  () => route.matched,
  (newValue, oldValue) => {
    activeIndex.value = newValue[newValue.length - 1].path;
  }
);
onMounted(() => {
  window.addEventListener("scroll", watchScroll, true);
  store.dispatch("user/login");
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

const resetForm = () => {
  form.value.resetFields();
  formKey.value++;
};
const submitForm = () => {
  form.value.validate((valid, fields) => {
    if (valid) {
      if (store.state.user.info) {
        ElMessage({
          type: "error",
          message: "已登录！",
          "show-close": true,
          grouping: true,
        });
      } else {
        store.dispatch("user/login", loginInfo.value).then((rst) => {
          if (rst) {
            ElMessage({
              type: "success",
              message: "登录成功！",
              "show-close": true,
              grouping: true,
            });
            showDialog.value = false;
          } else {
            ElMessage({
              type: "error",
              message: "登录失败！请重新登录！",
              "show-close": true,
              grouping: true,
            });
          }
        });
      }
    }
  });
};
const exit = () => {
  if (store.state.user.info) {
    store.dispatch("user/exit", store.state.user.info).then((rst) => {
      ElMessage({
        type: "info",
        message: rst,
        "show-close": true,
        grouping: true,
      });
      resetForm();
    });
  } else {
    ElMessage({
      type: "info",
      message: "已退出！",
      "show-close": true,
      grouping: true,
    });
    resetForm();
  }
  showDialog.value = false;
};
</script>

<template>
  <div class="brand">
    <h1 @click="showDialog = true" :class="{ logined: store.state.user.info }">
      <i class="el-icon-sunny"></i>
    </h1>
    <span>轻松点，这一生，就当来旅游</span>
  </div>
  <div class="nav">
    <el-menu :default-active="activeIndex" router>
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
      <img src="/menu/vx.png" />
    </div>
    <div class="author-name">
      <strong>zhang</strong>
    </div>
    <div class="links">
      <div @click="jump('gitee')">
        <img src="/menu/gitee.png" /><span>Gitee</span>
      </div>
      <div @click="jump('csdn')">
        <img src="/menu/csdn.png" /><span>CSDN</span>
      </div>
    </div>
  </div>
  <el-dialog v-model="showDialog" custom-class="my-dialog login">
    <template #title>
      <img src="/menu/login.png" style="height: 20px; width: 40px" />
    </template>
    <el-form :model="loginInfo" ref="form" :rules="rules" :key="formKey">
      <el-form-item label="用户" prop="user">
        <el-input
          v-model="loginInfo.user"
          clearable
          v-on:keyup.enter="submitForm"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input
          type="password"
          v-model="loginInfo.pwd"
          autocomplete="off"
          show-password
          clearable
          v-on:keyup.enter="submitForm"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="success" @click="submitForm">登录</el-button>
      <el-button type="primary" @click="resetForm">重置</el-button>
      <el-button type="danger" @click="exit">退出登录</el-button>
    </template>
  </el-dialog>
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
  h1 {
    cursor: pointer;
    &:hover {
      color: orangered;
    }
  }
}
.logined {
  // color: #00ff00;
  // color: #67c23a;
  color: orangered;
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
        vertical-align: -9%;
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
      width: 32%;
      display: flex;
      justify-content: center;
      align-items: center;
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
<style lang="scss">
.my-dialog {
  //以下PC端
  &.normal {
    &.el-dialog {
      width: 800px;
      height: 400px;
    }
  }
  &.small {
    &.el-dialog {
      width: 800px;
    }
  }
  &.login {
    &.el-dialog {
      width: 400px;
    }
  }
  //以下移动端
  &.smallNormal {
    &.el-dialog {
      width: calc(100% - 40px);
      height: 400px;
    }
  }
  &.smallLogin {
    &.el-dialog {
      width: calc(100% - 40px);
    }
  }
  //以下通用
  &.schedule {
    &.el-dialog {
      // --el-dialog-margin-top: 12vh;
      max-width: 460px;
      min-width: 320px;
    }
  }
}
.el-dialog__header {
  border-bottom: 1px solid #eee;
}
.el-dialog__body {
  padding: 24px !important;
  height: calc(100% - 168px);
  overflow: auto;
  text-align: left;
}
.el-icon-sunny {
  animation: rotating 5s linear infinite;
}
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
