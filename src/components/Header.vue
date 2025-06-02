<template>
  <n-menu
      :options="menuOptions"
      :value="currentKey"
      mode="horizontal"
      inverted
      @update:value="onMenuClick"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { logout } from '@/services/authService';
import { useMessage } from 'naive-ui';
import { NMenu } from 'naive-ui';

const router = useRouter();
const message = useMessage();
const { user } = useAuth();

const common = [ { label: 'Галерея', key: 'Gallery' } ];
const guestMenu = [ { label: 'Вхід', key: 'Login' }, { label: 'Реєстрація', key: 'Register' } ];
const userMenu  = [ { label: 'Профіль', key: 'Profile' }, { label: 'Вийти', key: 'Logout' } ];

const menuOptions = computed(() => {
  return user.value ? [...common, ...userMenu] : [...common, ...guestMenu];
});

const currentKey = ref<string>('Gallery');

async function onMenuClick(key: string) {
  if (key === 'Logout') {
    await logout();
    message.success('Ви вийшли');
    await router.push({ name: 'Gallery' });
    return;
  }
  currentKey.value = key;
  await router.push({ name: key });
}
</script>

<style scoped>
</style>
