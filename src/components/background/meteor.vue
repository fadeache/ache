<script setup>
const props = defineProps({
  delay: {
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
  rotateDeg: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div class="meteor" :style="`transform:rotate(${rotateDeg}deg)`">
    <div
      class="line"
      :style="`animationDelay:${delay}s;width:${w}px;height:${h}px;`"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.meteor {
  width: 2px;
  height: 200px;
  position: relative;
  // overflow: hidden;
  .line {
    animation: meteoring 6s infinite linear;
    position: absolute;
    width: 2px;
    height: 200px;
    background: linear-gradient(
      to top,
      rgb(2, 161, 195, 1),
      rgba(11, 36, 66, 0.1)
    );
    border-radius: 2px;
    box-shadow: 0px 10px 20px 0px #02a1c3;
    opacity: 0;
    &::before {
      width: 2px;
      height: 2px;
      content: "";
      position: absolute;
      bottom: 0px;
      left: 0px;
      border-radius: 50%;
      background: #00d0ff;
      box-shadow: 0px 0px 12px 5px #00d0ff;
    }
  }
}
@keyframes meteoring {
  0% {
    opacity: 0;
    top: -250px;
  }
  25% {
    opacity: 0.5;
    top: 0px;
  }
  50% {
    opacity: 0.8;
    top: 250px;
  }
  75% {
    opacity: 1;
    top: 500px;
  }
  100% {
    opacity: 0;
    top: 750px;
  }
}
</style>
