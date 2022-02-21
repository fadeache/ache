<script setup>
import { reactive, ref } from "vue";
import axios from "axios";

const state = reactive({
  loading: false,
  showDialog: false,
  dialogData: {},
  result: [],
});

const apis = ref([
  {
    icon: "trash",
    name: "trash words generator",
    api: "api/SweetNothings/Serialization/Json",
    abstract: "渣男语录生成",
  },
  {
    icon: "tea",
    name: "green tea words generator",
    api: "api/SweetNothings/Web/0",
    abstract: "绿茶语录生成",
  },
  {
    icon: "one",
    name: "one good word",
    api: "https://v1.hitokoto.cn",
    abstract:
      "一言指的就是一句话，可以是动漫中的台词，也可以是网络上的各种小段子。",
  },
  {
    icon: "wait",
    name: "敬请期待",
    api: "hello",
    abstract: "语录生成",
  },
  {
    icon: "wait",
    name: "敬请期待",
    api: "api/SweetNothings",
    abstract: "语录生成",
  },
  {
    icon: "wait",
    name: "敬请期待",
    api: "api/SweetNothings",
    abstract: "语录生成",
  },
]);

const getWords = async (item, num) => {
  state.dialogData = item;
  detail(item, num);
  if (item.icon !== "wait") {
    state.showDialog = true;
  }
};
const detail = async (item, num) => {
  if (item.icon === "trash") {
    let filter = ref({
      count: num,
    });
    let res = await axios.get(item.api, { params: filter.value });
    state.result = res.data.returnObj;
  } else if (item.icon === "tea") {
    let res = await axios.get(item.api);
    state.result = [res.data.returnObj.content];
  } else if (item.icon === "one") {
    let res = await axios.get(item.api);
    state.result = [
      res.data.hitokoto + (res.data.from_who ? "——" + res.data.from_who : ""),
    ];
  }
};
</script>

<template>
  <div class="cards">
    <div
      v-for="item in apis"
      :key="item.api"
      class="card"
      @click="getWords(item, 1)"
    >
      <div class="portrait">
        <img :src="`/word/${item.icon}.png`" />
      </div>
      <div class="content">
        <div>
          <strong>{{ item.name }}</strong>
        </div>
        <div>{{ item.abstract }}</div>
      </div>
    </div>
  </div>

  <el-dialog v-model="state.showDialog" v-if="state.showDialog">
    <template #title>
      <div class="title">
        <img :src="`/word/${state.dialogData.icon}.png`" />
        <span>{{ state.dialogData.name }}</span>
      </div>
    </template>
    <div style="margin-bottom: 16px" v-for="item in state.result">
      {{ item }}
    </div>
    <template #footer>
      <el-button type="primary" @click="detail(state.dialogData, 1)"
        >再来一条</el-button
      >
      <el-button
        v-if="state.dialogData.icon === 'trash'"
        type="primary"
        @click="detail(state.dialogData, 6)"
        >再来六条</el-button
      >
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  padding: 0 8px;
  justify-content: space-between;
  height: 100%;
  .card {
    box-sizing: border-box;
    width: 400px;
    height: 100px;
    border: 1px solid #dddddd;
    border-radius: 3px;
    transition: 0.3s ease-out;
    display: flex;
    &:nth-child(1):hover,
    &:nth-child(2):hover,
    &:nth-child(3):hover {
      box-shadow: 8px 8px 12px 0px rgba(0, 0, 0, 0.08);
      transform: translateY(-10px);
      transition: 0.1s ease-in;
      cursor: pointer;
    }
    .portrait {
      width: calc(98px - 16px);
      padding: 8px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      width: calc(100% - 98px - 32px);
      text-align: left;
      padding: 16px;
      div {
        &:first-child {
          color: #373e4a;
        }
        &:last-child {
          margin-top: 4px;
          color: #979898;
          font-size: 15px;
          overflow: hidden; // 超过两行显示省略号
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
  }
}
.title {
  text-align: left;
  line-height: 20px;
  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    vertical-align: -20%;
  }
}
</style>
<style lang="scss">
.el-dialog {
  width: 800px;
  height: 400px;
}
.el-dialog__header {
  border-bottom: 1px solid #eee;
}
.el-dialog__body {
  padding: 24px;
  height: calc(100% - 168px);
  overflow: auto;
  text-align: left;
}
</style>
