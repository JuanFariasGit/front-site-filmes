<script setup lang="ts">
import {ref} from "vue"

const search = ref('')
const emit = defineEmits(['get-movies'])

const getMovies = () => emit('get-movies', search.value)
</script>

<template>
  <div class="flex justify-center">
    <input
        type="text"
        placeholder="Buscar filme"
        class="input input-bordered w-full max-w-xs"
        @keyup="getMovies"
        v-model="search"
    />
  </div>
</template>

<style scoped>
div {
  margin-bottom: 1rem;
}
</style>