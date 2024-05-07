import express from 'express';
const app = express();

// dotenv
import dotenv from 'dotenv';
dotenv.config();

 // fetch movies
 const API_KEY = process.env.API_KEY;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));


const fetchNowPlaying = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${process.env.API_KEY}`);
    const now_playing = await response.json();
    return now_playing;
}

const fetchTrendingMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=${process.env.API_KEY}`);
    const movies = await response.json();
    return movies;
}

const fetchTrendingSeries = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/trending/tv/week?language=en-US&api_key=${process.env.API_KEY}`);
    const series = await response.json();
    return series;
}

const fetchSearchResults = async (searchQuery) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&page=1&api_key=${process.env.API_KEY}`);
    const searchResults = await response.json();
    return searchResults;
}

const fetchDetails = async (movieID) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US&api_key=${process.env.API_KEY}`)
    const details = await response.json();
    return details;
}

const fetchRelatedMovies = async (movieID) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/recommendations?language=en-US&page=1&api_key=${process.env.API_KEY}`)
    const related = await response.json();
    return related;
}

app.get('/', async (req, res) => {
    try {
        const getMovies = await fetchTrendingMovies();
        const getSeries = await fetchTrendingSeries();
        res.render('pages/index', { title: "Home - Webflix", movies: getMovies.results, series: getSeries.results}) 
    } catch (error) {
        console.log(error)
    }
 });

 app.get('/movie/:id/', async (req, res) => {
    try {
        const movieID = req.params.id;
        // console.log(movieID);
        const getDetails = await fetchDetails(movieID);
        const getRelated = await fetchRelatedMovies(movieID);
        console.log(getDetails)
        res.render('pages/details', {title: getDetails.title + " - Webflix", details: getDetails, related: getRelated.results})
    } catch (error) {
        console.log(error)
    }
 });

 app.get('/search', async (req, res) => {
     try {
        const searchQuery = req.query.query;
        console.log(searchQuery);
        const getSearchResults = await fetchSearchResults(searchQuery);
        res.render('pages/search', {title: "Webflix", results: getSearchResults.results})
    } catch (error) {
        console.log(error)
    }
 });

 app.get('/*', async (req, res) => {
    try {
        res.render('pages/404', { title: "Webflix"}) 
    } catch (error) {
        console.log(error)
    }
 });

// server port setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening @ port ${PORT}`);
});

       
