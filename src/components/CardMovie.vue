<script setup lang="ts">
import {Movie} from "@/types/movie.types";
import api from "@/service/api";

defineProps<{
  movie: Movie
}>()

const favorite = async (movie: Movie) => {
  try {
    const response = await api.post('/favorites', {
      "tmdb_id": movie.id,
      "title": movie.title,
      "poster_path": movie.poster_path,
      "genre_ids": movie.genre_ids
    })

    alert('Filme favoritado com sucesso.')
  } catch (error) {
    alert(error.response.data.message)
  }

  return null
}

</script>

<template>
  <div class="card bg-base-100 shadow-sm m-4">
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
        <div class="badge badge-outline cursor-pointer" @click="favorite(movie)">Favoritar</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .card {
    margin-bottom: 0.5rem;
  }
</style>