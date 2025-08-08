import api from "@/service/api";
import {defineStore} from "pinia";
import { Movie } from "@/types/movie.types";
import {useRoute} from "vue-router";

interface State {
    favorites: Array<Movie>,
    currentPage: 1,
    totalPages: 0,
    genreIds: ''
}

export const favoriteStore = defineStore('favorite', {
    state: (): State => {
        return {
            favorites: [],
            currentPage: 1,
            totalPages: 0,
            genreIds: ''
        }
    },
    actions: {
        async getFavorites(genreIds = '', change = false) {
            const route = useRoute()

            this.genreIds = change || route ? genreIds : this.genreIds
            this.currentPage = change || route ? 1 : this.currentPage

            let path = `favorites?genre_ids=${this.genreIds}&page=${this.currentPage}`

            const { data: { data, per_page, total } } = await api.get(path)

            this.favorites = data
            this.totalPages = Math.ceil(total / per_page)

            return null
        },
        async createFavorite(movie) {
            try {
                await api.post('/favorites', {
                    "tmdb_id": movie.id,
                    "title": movie.title,
                    "poster_path": movie.poster_path,
                    "genre_ids": movie.genre_ids
                })

                alert('Filme favoritado com sucesso.')
            } catch (error) {
                alert(error.response.data.message)
            }

            return null
        },
        async deleteFavorite(id) {
            if (confirm('Deseja realmente excluir?')) {
                await api.delete(`/favorites/${id}`)

                this.getFavorites()
            }

            return null
        }
    },
    getters: {

    }
})