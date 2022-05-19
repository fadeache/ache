<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
const props = defineProps({
  code: String,
  width: Number,
});
const viewBox = ref("0 0 24 24");
const color = ref("");
const contentSvg = ref("");
// watch(
//   () => props.code,
//   () => {
//     getUrl();
//   }
// );
onMounted(() => {
  getUrl();
});
const getUrl = () => {
  if (!props.code) {
    return;
  }
  axios.get("/ache/icon/get", { params: { code: props.code } }).then((rst) => {
    const content = rst.data[0].xml;
    viewBox.value = getString(content, 'viewBox="', '"') || "0 0 24 24";
    color.value = getString(content, 'fill="', '"');
    contentSvg.value = getString(
      content,
      "<svg" + getString(content, "<svg", ">") + ">",
      "</svg>"
    );
    // console.log(getString(content, "<svg", ">"), 111);
    // console.log(content, 222);
    // console.log(viewBox.value, 333);
    // console.log(contentSvg, 444);
  });
};
const getString = (str, start, end) => {
  if (str.split(start)[1]) return str.split(start)[1].split(end)[0];
  else return "";
};
</script>

<template>
  <svg
    :viewBox="viewBox"
    :fill="color"
    v-html="contentSvg"
    :style="{ width: `${props.width ? props.width : '21px'}` }"
  ></svg>
</template>
<style lang="scss" scoped>
svg {
  vertical-align: top;
}
</style>
