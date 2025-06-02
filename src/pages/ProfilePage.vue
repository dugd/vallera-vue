<template>
  <div style="padding: 16px; max-width: 800px; margin: 0 auto;">
    <h2>Профіль</h2>

    <div v-if="!user">
      <n-empty description="Ви не залогінені"/>
    </div>

    <div v-else>
      <n-avatar size="64" style="margin-bottom: 12px;"/>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Ім'я:</strong> {{ user.displayName }}</p>

      <h3 style="margin-top: 24px;">Мої фото</h3>
      <div v-if="loading">
        <n-empty description="Завантаження..."/>
      </div>
      <div v-else-if="myPhotos.length === 0">
        <n-empty description="У вас ще немає фото"/>
      </div>
      <div v-else class="css-masonry">
        <div
            v-for="photo in myPhotos"
            :key="photo.id"
            class="css-masonry-item"
            @click="goToDetail(photo.id)"
        >
          <img :src="photo.url" alt="" loading="lazy" class="item-image"/>
          <div class="item-meta">
            <span class="item-author">{{ photo.authorName }}</span>
            <span class="item-separator">·</span>
            <span class="item-date">{{ formatDateUA(photo.date) }}</span>
          </div>
        </div>
      </div>

      <div style="margin-top: 24px; text-align: center;">
        <n-button type="primary" @click="goToUpload">Завантажити нове фото</n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {useAuth} from '@/composables/useAuth';
import {fetchMyPhotos} from '@/services/photoService';
import {formatDateUA} from '@/utils/date';
import type {Photo} from '@/types/photo';

const {user} = useAuth();
const router = useRouter();
const myPhotos = ref<Photo[]>([]);
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  myPhotos.value = await fetchMyPhotos();
  loading.value = false;
});

function goToDetail(id: string) {
  router.push({name: 'PhotoDetail', params: {id}});
}

function goToUpload() {
  router.push({name: 'Upload'});
}
</script>

<style scoped>
.css-masonry {
  column-count: 3;
  column-gap: 16px;
  margin-top: 16px;
}

@media (max-width: 800px) {
  .css-masonry {
    column-count: 2;
  }
}

@media (max-width: 500px) {
  .css-masonry {
    column-count: 1;
  }
}

.css-masonry-item {
  display: inline-block;
  width: 100%;
  margin-bottom: 16px;
  break-inside: avoid;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.item-image {
  display: block;
  width: 100%;
  object-fit: cover;
}

.item-meta {
  display: flex;
  align-items: center;
  padding: 8px;
  font-size: 14px;
  background: #fafafa;
}

.item-author {
  font-weight: 500;
}

.item-separator {
  margin: 0 4px;
  color: #888;
}

.item-date {
  color: #666;
}
</style>
