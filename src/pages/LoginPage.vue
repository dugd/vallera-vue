<template>
  <div class="auth-container">
    <n-card title="Увійти" style="max-width: 400px; margin: 40px auto;">
      <n-form @submit="onSubmit">
        <n-form-item label="Email">
          <n-input v-model:value="email" placeholder="you@example.com" />
        </n-form-item>
        <n-form-item label="Пароль">
          <n-input type="password" v-model:value="password" placeholder="••••••" />
        </n-form-item>
        <n-form-item>
          <n-button type="primary" block native-type="submit">Увійти</n-button>
        </n-form-item>
        <n-form-item class="text-center">
          Нема акаунту? <RouterLink to="/register">Зареєструватися</RouterLink>
        </n-form-item>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';
import { login } from '@/services/authService';

const email = ref('');
const password = ref('');
const router = useRouter();
const message = useMessage();

async function onSubmit(e: Event) {
  e.preventDefault();
  try {
    await login(email.value, password.value);
    message.success('Успішний вхід');
    await router.push({ name: 'Gallery' });
  } catch (err: any) {
    message.error(err.message || 'Неправильні дані');
  }
}
</script>

<style scoped>
.auth-container {
  padding: 16px;
}
</style>
