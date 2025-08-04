<script setup lang="ts">
import api from "@/service/api";
import {onMounted, ref} from "vue";
import CardMovie from "@/components/CardMovie.vue";
import Pagination from "@/components/Pagination.vue";
import NavBar from "@/components/NavBar.vue";
import {scrollTop} from "@/utils/helpers";
import SearchMovie from "@/components/SearchMovie.vue";

const movies = ref([])
const currentPage = ref(1)
const currentSearch = ref('')
const totalPages = ref(0)

const getMovies = async (search = '', paramPage = 0) => {
  let path = `/movies?search=${search}`
  path += paramPage != 0 ? '&page=' + paramPage : ''

  const { data: { results, page, total_pages } } = await api.get(path)

  currentSearch.value = search
  movies.value = results
  currentPage.value = page
  totalPages.value = total_pages

  return null
}

const paginationNext = () => {
  if (currentPage.value < totalPages.value) {
    const pageNext = currentPage.value + 1
    getMovies(currentSearch.value, pageNext)
    scrollTop()
  }
}

const paginationPrev = () => {
  if (currentPage.value > 1) {
    const pagePrev = currentPage.value - 1
    getMovies(currentSearch.value, pagePrev)
    scrollTop()
  }
}

onMounted(() => {
  getMovies(currentSearch.value)
})
</script>

<template>
  <NavBar brand="KingHost" />

  <SearchMovie v-on:getMovies="getMovies" />

  <div class="grid md:grid-cols-4 grid-cols-1 justify-center">
    <div v-for="movie in movies" :key="movie.id" class="md:col-span-1 px-4 col-span-3">
      <CardMovie
          :movie="movie"
      />
    </div>
  </div>

  <Pagination
      :current-page="currentPage"
      v-on:paginationPrev="paginationPrev"
      v-on:paginationNext="paginationNext"
  />
</template>
