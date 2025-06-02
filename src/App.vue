<template>
  <n-layout style="min-height: 100vh;">
    <n-message-provider>

      <n-layout-header
          style="display: flex; align-items: center; padding: 0 24px; background: #3c3e44;"
      >
        <div
            class="logo"
            @click="$router.push({ name: 'Gallery' })"
        >
          Vallera
        </div>
        <Header />
      </n-layout-header>

      <n-layout-content style="padding: 16px;">
          <router-view />
      </n-layout-content>

    </n-message-provider>
  </n-layout>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import { NLayout, NLayoutHeader, NLayoutContent, NMessageProvider } from 'naive-ui';
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
