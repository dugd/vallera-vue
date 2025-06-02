<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import { formatDateUA } from '@/utils/date';

const props = defineProps<{
  id: string;
  photoUrl: string;
  author: string;
  date: string;
  alt?: string;
}>();

const emits = defineEmits<{
  (e: 'click', payload: { id: string }): void;
}>();

const formattedDate = computed(() => {
  return formatDateUA(props.date);
});

function onCardClick() {
  emits('click', { id: props.id });
}
</script>

<template>
  <div class="photo-card" @click="onCardClick">
    <div class="photo-card__img-wrapper">
      <img
          :src="photoUrl"
          :alt="alt || author"
          class="photo-card__image"
          loading="lazy"
      />
    </div>
    <div class="photo-card__meta">
      <span class="photo-card__author">{{ author }}</span>
      <span class="photo-card__separator">·</span>
      <span class="photo-card__date">{{ formattedDate }}</span>
    </div>
  </div>
</template>

<style scoped>
.photo-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.photo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 14px rgba(0,0,0,0.15);
}

.photo-card__img-wrapper {
  width: 100%;
  overflow: hidden;
}

.photo-card__image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
}

.photo-card__meta {
  display: flex;
  align-items: center;
  padding: 8px;
  font-size: 14px;
  color: #333;
  background: #fafafa;
}

.photo-card__author {
  font-weight: 500;
}

.photo-card__separator {
  margin: 0 4px;
  color: #888;
}

.photo-card__date {
  color: #666;
}
</style>
