<script setup>
import { ref, onMounted, watch, reactive } from "vue";
import axios from "axios";
import translate from "../utils/translate.js";
import visit from "../js/visit";

const state = reactive({
  active: 0,
  reverseActive: false,
});
const blogType = ref(["all", "vue", "css", "js", "es6", "micro", "server"]);
const blogs = ref([]);
const params = ref({
  time: "",
  os: "",
  screen: "",
});
const filter = ref({
  sort: "",
  type: "",
  search: "",
});

onMounted(() => {
  getBlog();
  insertVisit();
});

watch(
  () => filter.value.search,
  () => {
    getBlog();
  }
);

const insertVisit = async () => {
  params.value.time = visit.getVisitInfo()[0];
  params.value.os = visit.getVisitInfo()[1];
  params.value.screen = visit.getVisitInfo()[2];
  await axios.post("/ache/visit/insert", params.value);
};

const jump = (url) => {
  window.open("https://blog.csdn.net/bDreamer/article/details/" + url);
};

const getBlog = async (index, type, sort) => {
  if (type) {
    if (type === "all") filter.value.type = "";
    else filter.value.type = type;
    state.active = index;
  }
  if (sort) {
    if (filter.value.sort === "reverse") {
      filter.value.sort = "";
      state.reverseActive = false;
    } else {
      filter.value.sort = "reverse";
      state.reverseActive = true;
    }
  }
  let res = await axios.get("/ache/blog", { params: filter.value });
  blogs.value = res.data;
};

const highLight = (allText, keyword) => {
  let Reg = new RegExp(keyword, "ig");
  if (allText) {
    let execRes = Reg.exec(allText.toString()); //得到一个匹配结果的集合，包含关键字出现的索引
    if (execRes) {
      let realword = allText.substr(execRes.index, keyword.length); //根据索引和关键字长度获取原本的真实大小写关键词
      let res = allText.replace(
        Reg,
        `<span style="color: red;">${realword}</span>`
      );
      return res;
    }
  }
};
</script>

<template>
  <div class="search">
    <div>
      <el-input v-model="filter.search" placeholder="搜一搜"></el-input>
    </div>
    <div>
      <a
        href="#"
        v-for="(item, index) in blogType"
        @click="getBlog(index, item)"
        :class="{ isactive: state.active === index }"
        >{{ translate.type(item) }}</a
      >
      <a
        href="#"
        :class="{ isactive: state.reverseActive }"
        @click="getBlog(7, '', 'reverse')"
        >倒序</a
      >
    </div>
  </div>
  <el-timeline v-if="blogs.length">
    <el-timeline-item
      v-for="item in blogs"
      :timestamp="item.time"
      :color="item.color"
      placement="top"
    >
      <el-card @click="jump(item.url)">
        <h3 v-html="highLight(item.title, filter.search)"></h3>
        <p v-html="highLight(item.detail, filter.search)"></p>
        <img v-if="item.pic" :src="`/blog/${item.pic}.png`" />
        <p>
          收录于 <strong>{{ translate.type(item.type) }}</strong>
        </p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
  <div v-else>
    <el-empty
      image="/blog/empty.png"
      description=" "
      :image-size="320"
    ></el-empty>
  </div>
</template>

<style scoped lang="scss">
.search {
  height: 100px;

  width: 720px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  .el-input {
    --el-input-focus-border: grey;
  }
  a {
    margin-right: 8px;
    font-size: 15px;
    color: #999;
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      color: #000;
    }
  }
}
.isactive {
  color: #000 !important;
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
