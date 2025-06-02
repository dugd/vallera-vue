<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { NEmpty } from 'naive-ui';
import PhotoCard from './PhotoCard.vue';

interface Photo {
  id:     string;
  url:    string;
  author: string;
  date:   string;
}

const props = defineProps<{
  photos: Photo[];
}>();

const emits = defineEmits<{
  (e: 'photo-click', id: string): void;
}>();

function onPhotoClick(evt: { id: string }) {
  emits('photo-click', evt.id);
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
