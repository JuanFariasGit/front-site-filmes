import api from "@/service/api";
import {defineStore} from "pinia";
import { Movie } from "@/types/movie.types";
import {Genre} from "@/types/genre.types";
import {useRoute} from "vue-router";

interface State {
    movies: Array<Movie>,
    genres: Array<Genre>,
    currentSearch: string,
    prevSearch: string,
    currentPage: 1,
    totalPages: 0
}

export const tmdbStore = defineStore('tmdb', {
    state: (): State => {
        return {
            movies: [],
            genres: [],
            currentSearch: '',
            prevSearch: '',
            currentPage: 1,
            totalPages: 0
        }
    },
    actions: {
        async getMovies() {
            this.currentPage = this.prevSearch != this.currentSearch ? 1 : this.currentPage

            let path = `/movies?search=${this.currentSearch}&page=${this.currentPage}`

            const { data: { results, total_pages } } = await api.get(path)

            this.movies = results
            this.totalPages = total_pages
            this.prevSearch = this.currentSearch

            return null
        },
        async getGenres() {
            const { data: { genres } } = await api.get('/genres')

            this.genres = genres

            return null
        }
    },
    getters: {

    }
})