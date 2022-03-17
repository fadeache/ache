<script setup>
import { onMounted, ref, watch, reactive } from "vue";
import { useRoute } from "vue-router";
import menu from "../../../menu.json";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

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
  user: [{ required: true, message: "请输入用户", trigger: ["change"] }],
  pwd: [{ required: true, message: "请输入密码", trigger: ["change"] }],
});
const drawer = ref(false);

watch(
  () => route.matched,
  (newValue, oldValue) => {
    activeIndex.value = newValue[newValue.length - 1].path;
  }
);
onMounted(() => {
  store.dispatch("user/login");
});

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
    <div class="function">
      <div @click="showDialog = true"><i class="el-icon-s-promotion"></i></div>
      <div @click="drawer = true"><i class="el-icon-menu"></i></div>
    </div>
    <h1 :class="{ logined: store.state.user.info }">☀</h1>
    <span>轻松点，这一生，就当来旅游</span>
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
                <i :class="item.icon"></i>
                <span class="title">{{ item.title }}</span>
              </template>
              <el-menu-item
                class="el-menu-item"
                v-for="sub in item.children"
                :key="sub.name"
                :index="item.router + sub.router"
                @click="drawer = false"
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
              @click="drawer = false"
            >
              <i :class="item.icon"></i>{{ item.title }}</el-menu-item
            >
          </template>
        </template>
      </el-menu>
    </div>
  </el-drawer>

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
  position: relative;
  height: 100px;
  padding: 24px 0;
  background-color: #222;
  color: #fff;
  span {
    color: #ddd;
  }
  .function {
    position: absolute;
    height: 56px;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: space-between;
    div {
      width: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
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
