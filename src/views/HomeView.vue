<script setup lang="ts">
import {onMounted} from "vue";
import CardMovie from "@/components/CardMovie.vue";
import Pagination from "@/components/Pagination.vue";
import NavBar from "@/components/NavBar.vue";
import {scrollTop} from "@/utils/helpers";
import {movieStore} from "@/store/movie";
import SearchMovie from "@/components/SearchMovie.vue";


const moviestore = movieStore()

const paginationNext = () => {
  if (moviestore.currentPage < moviestore.totalPages) {
    moviestore.currentPage++
    moviestore.getMovies()
    scrollTop()
  }
}

const paginationPrev = () => {
  if (moviestore.currentPage > 1) {
    moviestore.currentPage--
    moviestore.getMovies()
    scrollTop()
  }
}

onMounted(() => {
  moviestore.getMovies()
})
</script>

<template>
  <NavBar brand="KingHost" />

  <SearchMovie />

  <div class="grid md:grid-cols-4 grid-cols-1 justify-center">
    <div v-for="movie in moviestore.movies" :key="movie.id" class="md:col-span-1 px-4 col-span-3">
      <CardMovie
          :movie="movie"
      />
    </div>
  </div>

  <Pagination
      :current-page="moviestore.currentPage"
      v-on:paginationPrev="paginationPrev"
      v-on:paginationNext="paginationNext"
  />
</template>
