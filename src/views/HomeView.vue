<script setup lang="ts">
import {onMounted} from "vue";
import CardMovie from "@/components/CardMovie.vue";
import Pagination from "@/components/Pagination.vue";
import NavBar from "@/components/NavBar.vue";
import {scrollTop} from "@/utils/helpers";
import {tmdbStore} from "@/store/tmdb";
import SearchMovie from "@/components/SearchMovie.vue";


const tmdbstore = tmdbStore()


const paginationNext = () => {
  if (tmdbstore.currentPage < tmdbstore.totalPages) {
    tmdbstore.currentPage++
    tmdbstore.getMovies()
    scrollTop()
  }
}

const paginationPrev = () => {
  if (tmdbstore.currentPage > 1) {
    tmdbstore.currentPage--
    tmdbstore.getMovies()
    scrollTop()
  }
}

onMounted(() => {
  tmdbstore.getMovies()
})
</script>

<template>
  <NavBar brand="KingHost" />

  <SearchMovie />

  <div class="grid md:grid-cols-4 grid-cols-1 justify-center">
    <div v-for="movie in tmdbstore.movies" :key="movie.id" class="md:col-span-1 px-4 col-span-3">
      <CardMovie
          :movie="movie"
      />
    </div>
  </div>

  <Pagination
      :currentPage="tmdbstore.currentPage"
      v-on:paginationPrev="paginationPrev"
      v-on:paginationNext="paginationNext"
  />
</template>
