import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "bc2e732daca6732221f6eead152ea5bb",
        language: "ko-KR"
    }
})

export default instance;