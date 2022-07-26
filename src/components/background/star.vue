<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  starNumber: {
    type: Number,
    default: 0,
  },
  w: {
    type: Number,
    default: 0,
  },
  h: {
    type: Number,
    default: 0,
  },
});
onMounted(() => {
  randomStar();
});
const star = ref([]);
const setStar = (el) => {
  star.value.push(el);
};
const randomStar = () => {
  let starArr = star.value;
  // console.log(starArr);
  starArr.forEach((item) => {
    // console.log(item.children);
    item.style.top = Math.floor(Math.random() * 250 + 1) + "px";
    item.style.left = Math.floor(Math.random() * 700 + 1) + "px";
  });
};
</script>

<template>
  <div class="star">
    <div
      v-for="(item, index) in starNumber"
      :key="index"
      class="star-item"
      :ref="setStar"
      :style="`animationDelay:${index * 100}ms;width:${w}px;height:${h}px;`"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.star {
  width: 700px;
  height: 250px;
  position: relative;
  background: radial-gradient(
    at 0% 100%,
    rgba(9, 37, 61, 1) 20%,
    rgba(9, 31, 55, 1) 70%
  );
  .star-item {
    position: absolute;
    width: 4px;
    height: 4px;
    display: inline-block;
    animation: staring 2s infinite linear;
    background: rgba(2, 213, 255, 1);
    border-radius: 50%;
  }
}
@keyframes staring {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
