<template>
  <div style="padding: 16px;">
    <h2>Галерея</h2>
    <GalleryGrid :photos="photos" @photo-click="goToDetail" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { Photo } from '@/types';
import GalleryGrid from '@/components/GalleryGrid.vue';
import { fetchAllPhotos } from '@/services/photoService';

const photos = ref<Photo[]>([]);
const router = useRouter();

onMounted(async () => {
  photos.value = await fetchAllPhotos();
});

function goToDetail(id: string) {
  router.push({ name: 'PhotoDetail', params: { id } });
}
</script>

<style scoped>
</style>
