<script setup>
import blog from "../../blog.json";

const jump = (url) => {
  window.open("https://blog.csdn.net/bDreamer/article/details/" + url);
};
</script>

<template>
  <el-timeline>
    <el-timeline-item
      v-for="item in blog.data"
      :timestamp="item.time"
      :color="item.color"
      placement="top"
    >
      <el-card @click="jump(item.url)">
        <h3>{{ item.title }}</h3>
        <p>{{ item.abstract ? item.abstract : item.title }}</p>
        <img v-if="item.pic" :src="`/blog/${item.pic}.png`" />
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<style scoped lang="scss">
.el-timeline {
  text-align: left;
  .el-card {
    display: inline-block;
    img {
      max-width: 100%;
      max-height: 240px;
    }
    &:hover {
      cursor: pointer;
      box-shadow: 8px 8px 12px 0px rgba(0, 0, 0, 0.08);
    }
    p {
      color: #677383;
    }
    h3:hover {
      color: #409eff;
    }
  }
}
</style>
