import api from "@/service/api";
import {defineStore} from "pinia";
import { Movie } from "@/types/movie.types";

interface State {
    movies: Array<Movie>,
    favorites: Array<Movie>,
    currentSearch: string,
    currentPage: 1,
    totalPages: 0
}

export const movieStore = defineStore('movie', {
    state: (): State => {
        return {
            movies: [],
            favorites: [],
            currentSearch: '',
            currentPage: 1,
            totalPages: 0
        }
    },
    actions: {
        async getMovies() {
            let path = `/movies?search=${this.currentSearch}&page=${this.currentPage}`

            const { data: { results, total_pages } } = await api.get(path)

            this.movies = results
            this.totalPages = total_pages

            return null
        }
    },
    getters: {

    }
})