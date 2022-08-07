<script setup>
import { reactive } from "vue";
import Calendar from "../calendar/index.vue";
import Collapse from "../collapse/index.vue";

const props = defineProps({
  smallScreen: Boolean
})

const state = reactive({
  value: new Date(),
  activeName: "1",
  wallpapers: [
    {
      title: "随便找一句",
      content:
        "我们总害怕死亡，而如果人真的可以永远活着，我想人们同样会像害怕死亡一样害怕永恒，或厌倦永恒。",
      pic: "/main/threes.jpg",
    },
    {
      title: "再找一句",
      content:
        "人的一生可能燃烧也可能腐朽，我不能腐朽，我愿意燃烧起来！——奥斯特洛夫斯基",
      pic: "/main/ones.jpg",
    },
    {
      title: "再来一句",
      content:
        "人最宝贵的是生命。生命每个人只有一次。人的一生应当这样度过：回首往事，他不会因为虚度年华而悔恨，也不会因为卑鄙庸俗而羞愧；临终之际，他能够说：“我的整个生命和全部精力，都献给了世界上最壮丽的事业——为解放全人类而斗争。”",
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
          <el-image :src="item.pic" fit="fill" style="height: 100%; width: 100%"></el-image>
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
