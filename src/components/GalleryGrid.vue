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
          :author="photo.authorName"
          :date="photo.date"
          @click="onClick(photo.id)"
          class="css-masonry-item"
      />
    </section>
  </template>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { NEmpty } from 'naive-ui';
import PhotoCard from './PhotoCard.vue';
import type { Photo } from '@/types/photo';

const props = defineProps<{
  photos: Photo[];
}>();

const emits = defineEmits<{
  (e: 'photo-click', id: string): void;
}>();

function onClick(id: string) {
  emits('photo-click', id);
}
</script>

<style scoped>
.css-masonry {
  column-count: 4;
  column-gap: 16px;
  padding: 16px;
}
@media (max-width: 1200px) {
  .css-masonry { column-count: 3; }
}
@media (max-width: 800px) {
  .css-masonry { column-count: 2; }
}
@media (max-width: 500px) {
  .css-masonry { column-count: 1; }
}
.css-masonry-item {
  display: inline-block;
  width: 100%;
  margin-bottom: 16px;
  break-inside: avoid;
}
</style>
