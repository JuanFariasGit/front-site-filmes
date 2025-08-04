<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import FilterFavorite from "@/components/FilterFavorite.vue";
import api from "@/service/api";
import {onMounted, ref} from "vue";
import CardFavorite from "@/components/CardFavorite.vue";
import {scrollTop} from "@/utils/helpers";
import Pagination from "@/components/Pagination.vue";

const favorites = ref([])
const currentPage = ref(1)
const currentChosen = ref([])
const totalPages = ref(0)

const getFavorites = async (chosen = '', paramPage = 0) => {
  let path = `favorites?genre_ids=${chosen}`
  path += paramPage != 0 ? '&page=' + paramPage : ''

  const { data: { data, current_page, per_page, total } } = await api.get(path)

  favorites.value = data
  currentChosen.value = chosen
  totalPages.value = Math.ceil(total / per_page)
  currentPage.value = current_page

  return null
}

const paginationNext = () => {
  console.log(totalPages.value)
  if (currentPage.value < totalPages.value) {
    const pageNext = currentPage.value + 1
    getFavorites(currentChosen.value, pageNext)
    scrollTop()
  }
}

const paginationPrev = () => {
  if (currentPage.value > 1) {
    const pagePrev = currentPage.value - 1
    getFavorites(currentChosen.value, pagePrev)
    scrollTop()
  }
}

const deleteFavorite = async (movieId) => {
  const response = confirm('Deseja realmente excluir?')

  if (response) {
    await api.delete('/favorites/' + movieId)

    getFavorites(currentChosen.value, currentPage.value)
  }

  return null
}

onMounted(() => {
  getFavorites()
})
</script>

<template>
  <NavBar brand="KingHost"/>

  <details class="collapse-open bg-base-200">
    <summary class="collapse-title text-xl font-medium">Filtros</summary>
    <div class="collapse-content">
      <FilterFavorite v-on:getFavorites="getFavorites" />
    </div>
  </details>

  <div class="grid md:grid-cols-4 grid-cols-1 justify-center gap-4">
    <div v-for="favorite in favorites" class="md:col-span-1 md:px-0 px-4 col-span-3">
      <CardFavorite :movie="favorite" v-on:deleteFavorite="deleteFavorite(favorite.id)" />
    </div>
  </div>

  <Pagination
      :current-page="currentPage"
      v-on:paginationPrev="paginationPrev"
      v-on:paginationNext="paginationNext"
  />
</template>

<style scoped>
  details {
    margin-bottom: 1rem;
  }
</style>
