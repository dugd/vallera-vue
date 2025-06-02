<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { NButton, NEmpty } from 'naive-ui';
import { Photo } from "@/types";
import { formatDateUA } from '@/utils/date';
import { MOCK_PHOTOS } from '@/services/mockPhotos';

const route = useRoute();
const photo = ref<Photo | null>(null);

onMounted(() => {
  const id = route.params.id as string;
  photo.value = MOCK_PHOTOS.find(p => p.id === id) || null;
});

const formattedDate = computed(() => {
  if (!photo.value) return '';
  return formatDateUA(photo.value.date);
});

</script>

<template>
  <div style="padding: 16px; max-width: 800px; margin: 0 auto;">
    <n-button text @click="$router.back()" >Back</n-button>
    <h2 style="margin-top: 16px;">Детальний перегляд фото</h2>

    <div v-if="!photo">
      <n-empty description="Фото не знайдено" />
    </div>

    <div v-else class="detail-container">
      <img
          :src="photo.url"
          alt=""
          class="detail-image"
          loading="lazy"
      />
      <div class="detail-meta">
        <p><strong>Автор:</strong> {{ photo.author }}</p>
        <p><strong>Дата:</strong> {{ formattedDate }}</p>
      </div>
    </div>
  </div>
</template>

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
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
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