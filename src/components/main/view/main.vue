<script setup>
import { reactive } from "vue";
import Calendar from "../calendar/index.vue";
import Collapse from "../collapse/index.vue";

const props = defineProps({
  smallScreen: Boolean,
});

const state = reactive({
  value: new Date(),
  activeName: "1",
  wallpapers: [
    {
      title: "1.网站简介",
      content:
        "网站由vite+Vue3构建，Web端和移动端自适应，采用nginx部署前端，docker部署后端的方式在ubuntu服务器上搭建，接口由SpringBoot编写，部分为nginx转发。管理员角色可注册用户，用户默认角色为访客，部分操作隐藏或受限。登录信息分别存储于浏览器cookie和Vuex中，cookie用于两小时内自动登录，Vuex则可以根据用户角色的不同显示不同页面。密码采用md5加盐加密。",
      pic: "/main/threes.jpg",
    },
    {
      title: "2.功能简介",
      content:
        "首页折叠句子分为上下不同语言的两行，存储于数据库中，每次刷新自动随机返回8条，点击添加按钮可添加句子，其中外文可通过翻译功能自动翻译为多国语言，或者也可以通过手动输入。点击添加日程可选择日期，记录日程和进度，有日程的日期下会有横线显示，不同进度的日程颜色不一。未登录只能创建公共访客事件，登录之后才可创建账号的单独日程。点击两个事件可交换顺序，但只可交换当天事件。点击隐藏按钮可隐藏操作按钮，再次点击此位置可重新显示。博客可根据不同分类显示对应博文摘要，支持模糊搜索并高亮，点击可跳转至CSDN查看详情。",
      pic: "/main/ones.jpg",
    },
    {
      title: "3.书接上文",
      content:
        "动画采用纯css编写，通过大量span标签和伪元素实现各种物体，如太阳、云朵、风、树、风车的塑造。句子的接口为开源接口转发而来，点击句子可复制到剪切板，点击添加可跳转到首页添加此句子。图标中心支持图标的增删改查和组件代码复制，图标采用后端接口调用图标，数据库存储图标，前端图标组件化复用等方式，统一管理，极大提升了开发与维护效率，节约时间成本，为图标的使用提供了新的解题思路。网站图标均从数据库调用。关于页显示所有访客浏览记录，同一设备同一浏览器10分钟之内仅记录一次,并根据时间段和设备类型作出图表统计。",
      pic: "/main/fours.jpg",
    },
  ],
});
</script>

<template>
  <el-row>
    <el-col>
      <el-carousel type="card" height="336px">
        <el-carousel-item v-for="item in state.wallpapers" :key="item.title">
          <el-image
            :src="item.pic"
            fit="fill"
            style="height: 100%; width: 100%"
          ></el-image>
          <div class="word">
            <div style="margin-left: 32px">
              <p>{{ item.title }}</p>
              <p>{{ item.content }}</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-col>
  </el-row>
  <el-row :gutter="8">
    <el-col :span="14" :smallScreen="smallScreen">
      <Collapse></Collapse>
    </el-col>
    <el-col :span="10">
      <Calendar></Calendar>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.el-row {
  &:first-child {
    margin-bottom: 16px;
  }
}

:deep(.el-carousel) {
  .el-carousel__item--card {
    width: 560px;
  }

  .is-active {
    transform: translateX(154px) !important;
    // 总体宽度868-560后除以2等于154
  }

  ul {
    display: none;
  }

  .word {
    position: absolute;
    left: 6%;
    bottom: 24px;
    text-align: left;
    color: #ffffff;
    width: 88%;

    p {
      margin: 0;
    }

    p:first-child {
      font-size: 20px;
      font-weight: bold;
      margin: 0 0 8px 0;
    }

    p:last-child {
      line-height: 24px;
    }
  }

  .word::before {
    position: absolute;
    content: "";
    width: 4px;
    height: 80%;
    background: #ffffff;
    opacity: 0.44;
    top: 10%;
  }
}
</style>
