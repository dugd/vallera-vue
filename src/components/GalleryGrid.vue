<script setup lang="ts">
import { ref } from 'vue';
import { NEmpty } from 'naive-ui';
import PhotoCard from './PhotoCard.vue';

interface Photo {
  id:     string;
  url:    string;
  author: string;
  date:   string; // ISO
}

const photos = ref<Photo[]>([]);

photos.value = [
  { id: '1', url: 'https://picsum.photos/400/600?random=1', author: 'Ivan',  date: '2025-05-28T10:00:00Z' },
  { id: '2', url: 'https://picsum.photos/400/300?random=2', author: 'Olena', date: '2025-05-29T14:20:00Z' },
  { id: '3', url: 'https://picsum.photos/400/500?random=3', author: 'Sergey', date: '2025-05-27T18:45:00Z' },
  { id: '4', url: 'https://picsum.photos/600/600?random=4', author: 'Ivan',  date: '2025-05-28T10:00:00Z' },
  { id: '5', url: 'https://picsum.photos/400/300?random=5', author: 'Olena', date: '2025-05-29T14:20:00Z' },
  { id: '6', url: 'https://picsum.photos/600/400?random=6', author: 'Sergey', date: '2025-05-27T18:45:00Z' },
  { id: '7', url: 'https://picsum.photos/400/300?random=7', author: 'Ivan',  date: '2025-05-28T10:00:00Z' },
  { id: '8', url: 'https://picsum.photos/400/300?random=8', author: 'Olena', date: '2025-05-29T14:20:00Z' },
  { id: '9', url: 'https://picsum.photos/600/500?random=9', author: 'Sergey', date: '2025-05-27T18:45:00Z' },
];

function onPhotoClick(payload: { id: string }) {
  console.log('Клік по фото: id =', payload.id);
}
</script>

<template>
  <template v-if="photos.length === 0">
    <n-empty description="Немає фото" />
  </template>
  <template v-else>
    <section class="css-masonry">
      <PhotoCard
          v-for="photo in photos"
          :key="photo.id"
          :id="photo.id"
          :photoUrl="photo.url"
          :author="photo.author"
          :date="photo.date"
          @click="onPhotoClick"
          class="css-masonry-item"
      />
    </section>
  </template>
</template>

<style scoped>

.css-masonry {
  column-count: 4;
  column-gap: 16px;
  padding: 16px;
}

@media (max-width: 1200px) {
  .css-masonry {
    column-count: 3;
  }
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
}
</style>
