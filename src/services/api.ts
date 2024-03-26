import axios from 'axios';

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "1490797c589152d668c9d4ebd1abeff5",
        language: "pt-BR",
        include_adult: false,
    },
})