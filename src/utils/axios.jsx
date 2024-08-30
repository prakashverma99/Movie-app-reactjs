import axios from "axios";

const instance = axios.create({
    baseURL : "https://api.themoviedb.org/3/",

    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTBhN2M4NzExZjEyMTZmMjEyMmQzZjU2NDgzNjc1YiIsIm5iZiI6MTcyNTAxOTA1MC4yNDkwMzIsInN1YiI6IjY2YjgwMjNmZDE2YjdhNzM2M2YyYTdmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0BlDPR-NSrbEP3bv3JjzGWjJ7brA99ykhBsGsD0DzF4'
    }
})

export default instance