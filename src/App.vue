<script setup lang="ts">
import { NLayoutHeader, NMenu } from "naive-ui";
import GalleryCard from "./components/PhotoCard.vue";
import { ref } from 'vue';

let likes = ref<number>(0);
function increaseLikes() {
  likes.value++;
}

const activeKey = ref('home');

const menuOptions = [
  { label: 'Головна', key: 'home' },
  { label: 'Про нас', key: 'about' },
  { label: 'Послуги', key: 'services' },
  { label: 'Контакти', key: 'contacts' }
];

</script>

<template>
  <n-layout-header style="display: flex; align-items: center; padding: 0 24px;">
    <div class="logo" style="color: white; font-weight: bold; font-size: 1.2rem; margin-right: 32px;">
      MyApp
    </div>

    <n-menu
        :options="menuOptions"
        mode="horizontal"
        :value="activeKey"
        inverted
    />
  </n-layout-header>

  <h1>Cochabamba</h1>
  <gallery-card id="1" photo-url="./egg.jpg" alt="Monke"/>

</template>

<style scoped>
.n-layout-header {
  background-color: #3c3e44;
}

.n-layout-header {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
