<template>
  <div style="padding: 16px; max-width: 500px; margin: 0 auto;">
    <h2>Завантажити фото</h2>
    <n-card style="margin-top: 16px;">
      <n-form @submit="onSubmit">
        <n-form-item label="Файл">
          <input type="file" ref="fileInput" @change="onFileChange" />
        </n-form-item>
        <n-form-item label="Назва (опціонально)">
          <n-input v-model:value="title" placeholder="Наприклад: Закат" />
        </n-form-item>
        <n-form-item>
          <n-button type="primary" block native-type="submit" :disabled="!selectedFile">
            Завантажити
          </n-button>
        </n-form-item>
      </n-form>
      <div v-if="uploading" style="margin-top: 12px;">
        <n-empty description="Завантаження..." />
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';
import { createPhoto } from '@/services/photoService';

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const title = ref<string>('');
const uploading = ref(false);
const router = useRouter();
const message = useMessage();

function onFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files;
  if (files && files[0]) {
    selectedFile.value = files[0];
  }
}

async function onSubmit(e: Event) {
  e.preventDefault();
  if (!selectedFile.value) {
    message.error('Оберіть файл');
    return;
  }
  uploading.value = true;
  try {
    await createPhoto(selectedFile.value, title.value);
    message.success('Фото успішно завантажено');
    router.push({ name: 'Profile' });
  } catch (err: any) {
    message.error(err.message || 'Помилка завантаження');
  } finally {
    uploading.value = false;
  }
}
</script>

<style scoped>
</style>
