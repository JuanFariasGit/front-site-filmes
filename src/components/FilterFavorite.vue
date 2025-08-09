<script setup lang="ts">
import {onMounted, ref} from "vue";
import {tmdbStore} from "@/store/tmdb";
import {favoriteStore} from "@/store/favorite";

const optionsChosen = ref([])

const tmdbstore = tmdbStore()
const favoritestore = favoriteStore()

onMounted( () => {
  tmdbstore.getGenres()
})
</script>

<template>
  <div class="flex flex-wrap justify-center">
    <div v-for="option in tmdbstore.genres" :key="option.id" class="form-control">
        <label class="label cursor-pointe">
          <span class="label-text">{{ option.name }}</span>
          <input
              type="checkbox"
              class="checkbox"
              :value="option.id"
              v-model="optionsChosen"
              @change="favoritestore.getFavorites(optionsChosen, true)"
          />
        </label>
    </div>
  </div>
</template>

<style scoped>
  label {
    margin: 0.5rem;
  }
</style>