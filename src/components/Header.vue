<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { NMenu, useMessage } from 'naive-ui';

const router = useRouter();
const message = useMessage();

const isLoggedIn = ref(false);

const commonMenu = [
  { label: 'Галерея', key: 'Gallery' }
];

const guestMenu = [
  { label: 'Вхід', key: 'Login' },
  { label: 'Реєстрація', key: 'Register' }
];

const userMenu = [
  { label: 'Профіль', key: 'Profile' },
  { label: 'Вийти', key: 'Logout' }
];

const menuOptions = computed(() => {
  return isLoggedIn.value
      ? [...commonMenu, ...userMenu]
      : [...commonMenu, ...guestMenu];
});

const currentKey = ref<string>('Gallery');

function onMenuClick(key: string) {
  if (key === 'Logout') {
    isLoggedIn.value = false;
    message.success('Unlogged');
    router.push({ name: 'Gallery' });
    return;
  }
  if (key === 'Login') {
    isLoggedIn.value = true;
    message.success('Logged');
    router.push({ name: 'Gallery' });
    return;
  }
  currentKey.value = key;
  router.push({ name: key });
}
</script>

<template>
  <n-menu
      :options="menuOptions"
      :value="currentKey"
      mode="horizontal"
      inverted
      @update:value="onMenuClick"
  />
</template>

<style scoped>
</style>
