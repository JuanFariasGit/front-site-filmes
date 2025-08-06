<script setup lang="ts">
import {ref} from "vue"
import {movieStore} from "@/store/movie";


const moviestore = movieStore()
const search = ref('')

moviestore.currentSearch = search
</script>

<template>
  <div class="flex justify-center">
    <input
        type="text"
        placeholder="Buscar filme"
        class="input input-bordered w-full max-w-xs"
        @keyup="moviestore.getMovies"
        v-model="search"
    />
  </div>
</template>

<style scoped>
div {
  margin-bottom: 1rem;
}
</style>