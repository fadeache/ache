<script setup>
import words from "../../words.json";
import Main from "../components/main/main.vue";
import Small from "../components/main/small.vue";

const props = defineProps({
  smallScreen: Boolean,
});
</script>

<template>
  <Main v-if="!smallScreen" :words="words"></Main>
  <Small v-else :words="words"></Small>
</template>

<style scoped lang="scss"></style>
