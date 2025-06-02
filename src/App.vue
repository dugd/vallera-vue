<template>
  <n-layout style="min-height: 100vh;">
    <n-message-provider>
      <n-layout-header style="display: flex; align-items: center; padding: 0 24px; background: #3c3e44;">
        <div class="logo" @click="goHome">Vallera</div>
        <Header />
      </n-layout-header>

      <n-layout-content style="padding: 16px;">
        <router-view />
      </n-layout-content>
    </n-message-provider>
  </n-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';

const router = useRouter();
function goHome() {
  router.push({ name: 'Gallery' });
}
</script>

<style scoped>
.logo {
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 32px;
  cursor: pointer;
}
</style>
