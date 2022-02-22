<script setup>
import { reactive, onMounted } from "vue";
import axios from "axios";
import words from "../../words.json";
const state = reactive({
  springBoot: "",
  words: words,
  value: new Date(),
  activeName: "1",
  pictures: [
    "main/three.jpg",
    "main/one.png",
    "main/four.jpg",
    "main/twelve.jpg",
  ],
});
onMounted(() => {
  getSpringBoot();
});
const getSpringBoot = async () => {
  let res = await axios.get("/hello");
  state.springBoot = res.data;
};
</script>

<template>
  <el-backtop v-if="!state.isPhone" :right="150" :bottom="150"></el-backtop>
  <el-row>
    <el-col>
      <el-carousel
        indicator-position="outside"
        trigger="click"
        :interval="3000"
        :height="state.isPhone === true ? picHeightPhone : picHeightWeb"
      >
        <el-carousel-item v-for="url in state.pictures" :key="url">
          <el-image
            :src="url"
            fit="fill"
            style="height: 100%; width: 100%"
          ></el-image>
        </el-carousel-item>
      </el-carousel>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="13">
      <el-collapse
        v-model="state.activeName"
        accordion
        v-for="(word, index) in words"
        :key="word"
      >
        <el-collapse-item :title="word.zhcn" :name="index">
          <div>
            {{ word.enus }}
          </div>
        </el-collapse-item>
      </el-collapse></el-col
    >
    <el-col :span="11"
      ><el-calendar v-model="state.value"></el-calendar
    ></el-col>
  </el-row>
  <div class="calendar"></div>
</template>

<style scoped></style>
