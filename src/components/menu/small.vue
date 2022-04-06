<script setup>
import { onMounted, onBeforeUnmount, ref, watch, reactive } from "vue";
import { useRoute } from "vue-router";
import menu from "../../../menu.json";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

const change = ref(false); //滚动92之后改变功能键的背景色等
const sunFixed = ref(false); //滚动24之后固定小太阳
const hideWord = ref(false); //滚动52之后隐藏文字
const hideFunc = ref(false); //滚动148之后向下滚动隐藏功能键，向上滚动显示功能键
const store = useStore();
const route = useRoute();
const activeIndex = ref();
const showDialog = ref(false);
const loginInfo = ref({
  user: "",
  pwd: "",
});
const form = ref(null);
const formKey = ref(0);
const rules = reactive({
  user: [{ required: true, message: "请输入用户", trigger: ["blur"] }],
  pwd: [{ required: true, message: "请输入密码", trigger: ["blur"] }],
});
const drawer = ref(false);
const scrollTop = ref(0);

watch(
  () => route.matched,
  (newValue, oldValue) => {
    activeIndex.value = newValue[newValue.length - 1].path;
  }
);
watch(
  () => scrollTop.value,
  (newValue, oldValue) => {
    // if (newValue > 24) {
    //   sunFixed.value = true;
    //   if (newValue > 52) {
    //     hideWord.value = true;
    //     if (newValue > 92) {
    //       change.value = true;
    //       if (newValue > 148) {
    //         if (newValue > oldValue) {
    //           hideFunc.value = true;
    //         } else {
    //           hideFunc.value = false;
    //         }
    //       }
    //     } else {
    //       change.value = false;
    //     }
    //   } else {
    //     hideWord.value = false;
    //   }
    // } else {
    //   sunFixed.value = false;
    // }
    // 好像有时候会出点小bug
    if (newValue > 24) {
      sunFixed.value = true;
    } else {
      sunFixed.value = false;
    }
    if (newValue > 52) {
      hideWord.value = true;
    } else {
      hideWord.value = false;
    }
    if (newValue > 92) {
      change.value = true;
    } else {
      change.value = false;
    }
    if (newValue > 148) {
      if (newValue > oldValue) {
        hideFunc.value = true;
      } else {
        hideFunc.value = false;
      }
    }
  }
);

onMounted(() => {
  window.addEventListener("scroll", watchScroll, true);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", watchScroll, true);
});

const watchScroll = () => {
  scrollTop.value =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
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
    <div
      class="function"
      :style="[
        change ? 'color:#555;background:#fff;border-bottom:1px solid #eee' : '',
        hideFunc ? 'opacity: 0' : '',
      ]"
    >
      <div @click="showDialog = true">
        <el-icon><promotion /></el-icon>
      </div>
      <div :class="{ logined: store.state.user.info }" v-if="sunFixed">
        <el-icon><sunny class="is-loading" /></el-icon>
      </div>
      <div @click="drawer = true">
        <el-icon><operation /></el-icon>
      </div>
    </div>
    <div :class="{ logined: store.state.user.info }" class="sun">
      <el-icon v-if="!sunFixed"><sunny class="is-loading" /></el-icon>
    </div>
    <span
      :style="[
        hideWord ? 'opacity: 0;transition: all 0.5s;' : 'transition: all 0.5s;',
      ]"
      >轻松点，这一生，就当来旅游</span
    >
  </div>
  <el-drawer
    title="菜单"
    :with-header="false"
    :show-close="true"
    v-model="drawer"
    direction="ttb"
    size="280px"
  >
    <div class="nav">
      <el-menu :default-active="activeIndex" router>
        <template v-for="item in menu">
          <template v-if="item.children?.length">
            <el-sub-menu :key="item.name" :index="item.router">
              <template #title>
                <el-icon><component :is="item.icon"></component></el-icon>
                <span class="title">{{ item.title }}</span>
              </template>
              <el-menu-item
                class="el-menu-item"
                v-for="sub in item.children"
                :key="sub.name"
                :index="item.router + sub.router"
                @click="drawer = false"
              >
                <el-icon><component :is="sub.icon"></component></el-icon>
                <span class="title">{{ sub.title }}</span>
              </el-menu-item>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item
              class="el-menu-item"
              :key="item.name"
              :index="item.router"
              @click="drawer = false"
            >
              <el-icon><component :is="item.icon"></component></el-icon
              >{{ item.title }}</el-menu-item
            >
          </template>
        </template>
      </el-menu>
    </div>
  </el-drawer>

  <el-dialog v-model="showDialog" custom-class="my-dialog smallLogin">
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
  position: relative;
  height: 100px;
  padding: 24px 0;
  background-color: #222;
  color: #fff;
  .sun {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span {
    color: #ddd;
  }
  .function {
    z-index: 1999;
    position: fixed;
    height: 56px;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: space-between;
    transition: all 0.5s;
    div {
      width: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:first-child:hover,
      &:last-child:hover {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
}
.logined {
  // color: #00ff00;
  // color: #67c23a;
  color: orangered;
}
.nav {
  height: 240px;
  overflow: auto;
  text-align: left;
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
</style>
