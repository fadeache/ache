<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";

const state = reactive({
  quotations: { data: "加载中..." },
  type: "",
  tags: ["", "success", "info", "warning", "danger"],
  loading: false,
});
onMounted(() => {
  getTag();
});

const getTag = async () => {
  state.loading = true;
  state.quotations = await axios.get("api/SweetNothings");
  state.loading = false;
  let index = Math.floor(Math.random() * state.tags.length);
  state.type = state.tags[index];
};

const apis = ref([
  {
    pic: "@/assets/word/trash.png",
    name: "语录生成器",
    api: "api/SweetNothings",
    abstract: "语录生成",
  },
  {
    pic: "trashTalk.png",
    name: "敬请期待",
    api: "api/SweetNothings",
    abstract: "语录生成",
  },
  {
    pic: "trashTalk.png",
    name: "敬请期待",
    api: "api/SweetNothings",
    abstract: "语录生成",
  },
  {
    pic: "trashTalk.png",
    name: "敬请期待",
    api: "api/SweetNothings",
    abstract: "语录生成",
  },
  {
    pic: "trashTalk.png",
    name: "敬请期待",
    api: "api/SweetNothings",
    abstract: "语录生成",
  },
]);
</script>

<template>
  <!-- <div v-loading="state.loading">
    <el-tag @close="getTag" closable :type="state.type">
      {{ state.quotations.data }}
    </el-tag>
  </div> -->
  <div class="cards">
    <div v-for="item in apis" :key="item.api" class="card">
      <div class="portrait">
        <img src="../assets/word/trash.png" />
      </div>
      <div class="content">
        <div>
          <strong>{{ item.name }}</strong>
        </div>
        <div>{{ item.abstract }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cards {
  padding: 0 8px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .card {
    box-sizing: border-box;
    width: 400px;
    height: 100px;
    border: 1px solid #dddddd;
    border-radius: 3px;
    transition: 0.3s ease-out;
    display: flex;
    &:hover {
      box-shadow: 8px 8px 12px 0px rgba(0, 0, 0, 0.08);
      transform: translateY(-10px);
      transition: 0.1s ease-in;
      cursor: pointer;
    }
    .portrait {
      width: 98px;
      padding: 8px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      text-align: left;
      width: calc(100% - 98px);
      padding: 16px;
      div {
        &:first-child {
          color: #373e4a;
        }
        &:last-child {
          margin-top: 4px;
          color: #979898;
          font-size: 15px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
