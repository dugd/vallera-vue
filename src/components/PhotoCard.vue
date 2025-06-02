<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps<{
  id:      string;
  photoUrl: string;
  author:   string;
  date:    string;
}>();

const emits = defineEmits<{
  (e: 'click'): void;
}>();

const formattedDate = computed(() => {
  return new Date(props.date).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
});

function onClick() {
  emits('click');
}
</script>

<template>
  <div class="photo-card" @click="onClick">
    <img :src="photoUrl" alt="" class="photo-card__image" loading="lazy" />
    <div class="photo-card__meta">
      <span class="photo-card__author">{{ author }}</span>
      <span class="photo-card__separator">·</span>
      <span class="photo-card__date">{{ formattedDate }}</span>
    </div>
  </div>
</template>

<style scoped>
.photo-card {
  cursor: pointer;
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}
.photo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 6px rgba(0,0,0,0.15);
}
.photo-card__image {
  width: 100%;
  display: block;
  object-fit: cover;
}
.photo-card__meta {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  font-size: 13px;
  background: #fafafa;
  color: #333;
}
.photo-card__author { font-weight: 500; }
.photo-card__separator { margin: 0 4px; color: #888; }
.photo-card__date { color: #666; }
</style>
