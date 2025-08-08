<script setup lang="ts">
import {onMounted, ref} from "vue";
import {tmdbStore} from "@/store/tmdb";

const optionsChosen = ref([])
const tmdbstore = tmdbStore()

const emit = defineEmits(['get-favorites'])
const getFavorites = () => emit('get-favorites', optionsChosen.value, true)


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
              @change="getFavorites"
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