<template>
  <div class="auth-container">
    <n-card title="Реєстрація" style="max-width: 400px; margin: 40px auto;">
      <form @submit.prevent="onSubmit">
        <n-form-item label="Email">
          <n-input v-model:value="email" placeholder="you@example.com" />
        </n-form-item>

        <n-form-item label="Пароль">
          <n-input type="password" v-model:value="password" placeholder="••••••" />
        </n-form-item>

        <n-form-item label="Ім'я">
          <n-input v-model:value="displayName" placeholder="Ваше ім'я" />
        </n-form-item>

        <n-form-item>
          <button type="submit" style="width: 100%; padding: 8px; background: #409eff; color: white; border: none; border-radius: 4px;">
            Зареєструватися
          </button>
        </n-form-item>

        <n-form-item class="text-center">
          Вже є акаунт?
          <RouterLink to="/login">Увійти</RouterLink>
        </n-form-item>
      </form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';
import { register } from '@/services/authService';

const email = ref('');
const password = ref('');
const displayName = ref('');
const router = useRouter();
const message = useMessage();

async function onSubmit() {
  try {
    await register(email.value, password.value, displayName.value);
    message.success('Успішно зареєстровано');
    await router.push({ name: 'Gallery' });
  } catch (err: any) {
    message.error(err.message || 'Помилка реєстрації');
  }
}
</script>

<style scoped>
.auth-container {
  padding: 16px;
}
</style>
