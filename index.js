import express from 'express';
const app = express();

// dotenv
import dotenv from 'dotenv';
dotenv.config();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        const getMovies = await fetchMovies();
        console.log(getMovies);
        res.render('pages/index', { title: "Home - Webflix"}) 
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

 // fetch movies
const API_KEY = process.env.API_KEY;

const fetchMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/trending/all/week?language=en-US&api_key=${process.env.API_KEY}`);
    const movies = await response.json();
    return movies;
}

// server port setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening @ port ${PORT}`);
});

       
