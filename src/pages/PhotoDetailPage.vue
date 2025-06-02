<template>
  <div style="padding: 16px; max-width: 800px; margin: 0 auto;">
    <n-button text @click="$router.back()">← Назад</n-button>
    <h2 style="margin-top: 16px;">Детальний перегляд фото</h2>

    <div v-if="loading">
      <n-empty description="Завантаження..."/>
    </div>

    <div v-else-if="!photo">
      <n-empty description="Фото не знайдено"/>
    </div>

    <div v-else class="detail-container">
      <img
          :src="photo.url"
          alt=""
          class="detail-image"
          loading="lazy"
      />
      <div class="detail-meta">
        <p><strong>Автор:</strong> {{ photo.authorName }}</p>
        <p><strong>Дата:</strong> {{ formatDateUA(photo.date) }}</p>
        <p><strong>Назва:</strong> {{ title }}</p>

        <div style="margin-top: 16px;" v-if="isOwner">
          <n-button type="primary" @click="onEdit">Редагувати назву</n-button>
          <n-button type="error" @click="onDelete" style="margin-left: 8px;">Видалити фото</n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {NButton, NEmpty, useMessage} from 'naive-ui';
import {fetchPhotoById, deletePhoto, updatePhoto} from '@/services/photoService';
import {auth} from '@/services/firebase';
import {formatDateUA} from '@/utils/date';
import type {Photo} from '@/types/photo';

const route = useRoute();
const router = useRouter();
const message = useMessage();

const photo = ref<Photo | null>(null);
const title = ref<string>('');
const loading = ref(true);

onMounted(async () => {
  const id = route.params.id as string;
  const fetched = await fetchPhotoById(id);
  if (fetched) {
    photo.value = fetched;
    title.value = fetched.title || '';
  }
  loading.value = false;
});

const isOwner = computed(() => {
  return photo.value && auth.currentUser?.uid === photo.value.authorUid;
});

async function onEdit() {
  if (!photo.value) return;
  const newTitle = prompt('Нова назва:', title.value);
  if (newTitle !== null) {
    try {
      await updatePhoto(photo.value.id, {title: newTitle});
      title.value = newTitle;
      message.success('Назву оновлено');
    } catch (err: any) {
      message.error(err.message || 'Помилка оновлення');
    }
  }
}

async function onDelete() {
  if (!photo.value) return;
  const ok = confirm('Видалити фото?');
  if (!ok) return;
  try {
    await deletePhoto(photo.value.id, photo.value.url);
    message.success('Фото видалено');
    await router.push({name: 'Gallery'});
  } catch (err: any) {
    message.error(err.message || 'Не вдалося видалити');
  }
}
</script>

<style scoped>
.detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
}

@media (min-width: 600px) {
  .detail-container {
    flex-direction: row;
    gap: 24px;
    align-items: flex-start;
  }
}

.detail-image {
  width: 100%;
  max-width: 500px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.detail-meta {
  margin-top: 12px;
  width: 100%;
  text-align: left;
}

@media (min-width: 600px) {
  .detail-meta {
    margin-top: 0;
    flex: 1;
  }
}
</style>
