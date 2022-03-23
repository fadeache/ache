<script setup>
import Main from "../components/main/view/main.vue";
import Small from "../components/main/view/small.vue";

const props = defineProps({
  smallScreen: Boolean,
});
</script>

<template>
  <Main v-if="!smallScreen"></Main>
  <Small v-else></Small>
</template>

<style scoped lang="scss"></style>
