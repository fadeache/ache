<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
const props = defineProps({
  code: String,
  size: Number,
  disabled: Boolean,
});
const viewBox = ref("0 0 24 24");
const color = ref("");
const name = ref("");
const contentSvg = ref("");
watch(
  () => props.code,
  () => {
    getUrl();
  }
);
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
    name.value = rst.data[0].name;
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
  <el-tooltip
    placement="top"
    effect="light"
    :content="name"
    :disabled="props.disabled"
  >
    <svg
      :viewBox="viewBox"
      :fill="color"
      v-html="contentSvg"
      :style="{ width: `${props.size ? props.size : '21px'}` }"
    />
  </el-tooltip>
</template>
<style lang="scss" scoped>
svg {
  vertical-align: top;
}
</style>
