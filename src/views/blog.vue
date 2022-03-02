<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import translate from "../utils/translate.js";

const blogs = ref([]);

const jump = (url) => {
  window.open("https://blog.csdn.net/bDreamer/article/details/" + url);
};

onMounted(() => {
  getBlog();
});

const filter = ref({
  sort: "reverse",
  type: null,
});
const getBlog = async (type, sort) => {
  if (!sort) {
    if (type === "all") filter.value.type = null;
    else filter.value.type = type;
  } else {
    filter.value.sort === "reverse"
      ? (filter.value.sort = "")
      : (filter.value.sort = "reverse");
  }
  let res = await axios.get("/ache/blog", { params: filter.value });
  blogs.value = res.data;
};
</script>

<template>
  <div class="btns">
    <el-button @click="getBlog('all')">全部</el-button>
    <el-button @click="getBlog('vue')">VUE</el-button>
    <el-button @click="getBlog('css')">CSS</el-button>
    <el-button @click="getBlog('js')">JavaScript</el-button>
    <el-button @click="getBlog('es6')">ES6</el-button>
    <el-button @click="getBlog('micro')">微前端</el-button>
    <el-button @click="getBlog('server')">服务器</el-button>
    <el-button @click="getBlog('', 'reverse')">倒序</el-button>
  </div>
  <el-timeline>
    <el-timeline-item
      v-for="item in blogs"
      :timestamp="item.time"
      :color="item.color"
      placement="top"
    >
      <el-card @click="jump(item.url)">
        <h3>{{ item.title }}</h3>
        <p>{{ item.detail ? item.detail : item.title }}</p>
        <img v-if="item.pic" :src="`/blog/${item.pic}.png`" />
        <p>
          收录于 <strong>{{ translate.type(item.type) }}</strong>
        </p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<style scoped lang="scss">
.btns {
  height: 80px;
  display: flex;
  justify-content: center;
  .el-button {
    height: 30px;
  }
}
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
