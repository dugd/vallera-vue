<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import GalleryGrid from '@/components/GalleryGrid.vue';
import { Photo } from "@/types";
import { getMockPhotos } from '@/services/mockPhotos';

const router = useRouter();
const photos = ref<Photo[]>([]);

onMounted(() => {
  // mock
  photos.value = getMockPhotos();
});

function onGalleryPhotoClick(id: string) {
  router.push({ name: 'PhotoDetail', params: { id } });
}
</script>

<template>
  <div style="padding: 16px;">
    <h2>Галерея</h2>
    <GalleryGrid
        :photos="photos"
        @photo-click="onGalleryPhotoClick"
    />
  </div>
</template>

<style scoped>
</style>
