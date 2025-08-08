<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import FilterFavorite from "@/components/FilterFavorite.vue";
import {onMounted} from "vue";
import CardFavorite from "@/components/CardFavorite.vue";
import {scrollTop} from "@/utils/helpers";
import Pagination from "@/components/Pagination.vue";
import {favoriteStore} from "@/store/favorite";

const favoritestore = favoriteStore()

favoritestore.$reset()

const paginationNext = () => {
  if (favoritestore.currentPage < favoritestore.totalPages) {
    favoritestore.currentPage++
    favoritestore.getFavorites()
    scrollTop()
  }
}

const paginationPrev = () => {
  if (favoritestore.currentPage > 1) {
    favoritestore.currentPage--
    favoritestore.getFavorites()
    scrollTop()
  }
}

onMounted(() => {
  favoritestore.getFavorites()
})
</script>

<template>
  <NavBar brand="KingHost"/>

  <details class="collapse-open bg-base-200">
    <summary class="collapse-title text-xl font-medium">Filtros</summary>
    <div class="collapse-content">
      <FilterFavorite v-on:getFavorites="favoritestore.getFavorites" />
    </div>
  </details>

  <div class="grid md:grid-cols-4 grid-cols-1 justify-center gap-4">
    <div v-for="favorite in favoritestore.favorites" class="md:col-span-1 md:px-0 px-4 col-span-3">
      <CardFavorite :movie="favorite" v-on:deleteFavorite="favoritestore.deleteFavorite(favorite.id)" />
    </div>
  </div>

  <Pagination
      :currentPage="favoritestore.currentPage"
      v-on:paginationPrev="paginationPrev"
      v-on:paginationNext="paginationNext"
  />
</template>

<style scoped>
  details {
    margin-bottom: 1rem;
  }
</style>
