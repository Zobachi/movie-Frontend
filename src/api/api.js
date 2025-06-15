// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000', // Change this to your deployed backend URL in production
// });

// export default API;



// client/src/api/api.js
// Example usage in a component like Home.js
// client/src/api/api.js
// client/src/api/api.js


import axios from 'axios';


const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrendingMovies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/trending/movie/week`, {
      params: { api_key: API_KEY },
    });
    return res.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

