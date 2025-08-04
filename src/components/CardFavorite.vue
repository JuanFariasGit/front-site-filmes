<script setup lang="ts">
import {Movie} from "@/types/movie.types";
import {ref} from "vue";

defineProps<{
  movie: Movie
}>()

const movieId = ref('')
const emit = defineEmits(['delete-favorite'])
const deleteFavorite = () => emit('delete-favorite', movieId.value)
</script>

<template>
  <div class="card bg-base-100 shadow-sm">
    <figure>
      <img
          v-if="movie.poster_path"
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          :alt="`${ movie.title }`" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        {{ movie.title }}
      </h2>

      <div class="card-actions justify-end">
        <div class="badge badge-outline cursor-pointer" @click="deleteFavorite">Excluir</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .card {
    margin-bottom: 0.5rem;
  }
</style>