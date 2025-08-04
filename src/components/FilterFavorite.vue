<script setup lang="ts">
import api from "@/service/api";
import {onMounted, ref} from "vue";

const optionsFilter = ref([])
const optionsChosen = ref([])

const emit = defineEmits(['get-favorites'])

const getFavorites = () => emit('get-favorites', optionsChosen.value)

const getGenres = async () => {
  const { data: { genres } } = await api.get('/genres')

  optionsFilter.value = genres

  return null
}

onMounted( () => {
  getGenres()
})
</script>

<template>
  <div class="flex flex-wrap justify-center">
    <div v-for="option in optionsFilter" :key="option.id" class="form-control">
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