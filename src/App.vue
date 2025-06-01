<script setup lang="ts">
import { ref } from 'vue';

let likes = ref<number>(0);
function increaseLikes() {
  likes.value++;
}

</script>

<template>
  <h1>Cochabamba</h1>
  <div>Likes: <strong>{{likes}}</strong></div>
  <div>
    <button @click="increaseLikes">Like!</button>
  </div>
</template>

<style scoped>

</style>
