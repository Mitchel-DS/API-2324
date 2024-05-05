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

app.get('/', async (req, res) => {
    try {
        const getMovies = await fetchMovies();
        const getSeries = await fetchSeries();
        console.log(getMovies);
        console.log(getSeries);
        res.render('pages/index', { title: "Home - Webflix", movies: getMovies.results, series: getSeries.results}) 
    } catch (error) {
        console.log(error)
    }
 });

 app.get('/movie/:id/', async (req, res) => {
    try {
        const movieID = req.params.id;
        console.log(movieID);
        res.render('pages/details', {title: movieID + " - Webflix"})
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

const fetchMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=${process.env.API_KEY}`);
    const movies = await response.json();
    return movies;
}

const fetchSeries = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/trending/tv/week?language=en-US&api_key=${process.env.API_KEY}`);
    const series = await response.json();
    return series;
}

// server port setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening @ port ${PORT}`);
});

       
