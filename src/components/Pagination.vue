<script setup lang="ts">
  import {movieStore} from "@/store/movie";

  const moviestore = movieStore()
  const emit = defineEmits(['pagination-prev', 'pagination-next'])

  const paginationPrev = () => emit('pagination-prev')
  const paginationNext = () => emit('pagination-next')
</script>

<template>
  <div class="flex justify-center py-4">
    <button class="join-item btn" @click="paginationPrev">«</button>
    <button class="join-item btn">Página {{ moviestore.currentPage }}</button>
    <button class="join-item btn" @click="paginationNext">»</button>
  </div>
</template>
