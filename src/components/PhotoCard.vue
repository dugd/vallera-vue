<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { NCard } from "naive-ui";

const props = defineProps<{
  photoUrl: string;
  alt?: string;
  id: string;
}>();

const emits = defineEmits<{
  (e: 'click', payload?: {id?: string}): void
}>();

function onCardClick() {
  emits('click', { id: props.id });
}

</script>

<template>
<n-card
    hoverable
    class="photo-card"
    @click="onCardClick"
    :title="props.alt"
>
  <img
      :src="props.photoUrl"
      :alt="props.alt || 'Photo'"
      class="photo-card__image"
      loading="lazy"
  />
</n-card>
</template>

<style scoped>
.photo-card {
    width: 240px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.photo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
}

.photo-card__image {
  display: block;
  width: 100%;
  height: 160px;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
}
</style>