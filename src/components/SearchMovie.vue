<script setup lang="ts">
import {ref} from "vue"
import {tmdbStore} from "@/store/tmdb";


const tmdbstore = tmdbStore()
const search = ref('')

tmdbstore.currentSearch = search
</script>

<template>
  <div class="flex justify-center">
    <input
        type="text"
        placeholder="Buscar filme"
        class="input input-bordered w-full max-w-xs"
        @keyup="tmdbstore.getMovies"
        v-model="search"
    />
  </div>
</template>

<style scoped>
div {
  margin-bottom: 1rem;
}
</style>