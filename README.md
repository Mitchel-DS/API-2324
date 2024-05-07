# API-2324 @cmda-minor-web
![banner](/public/images/banner.png)

Welcome to the documentation of the proces of my API project "Webflix".

## Introduction 

This is Webflix, a streaming platform using the moviedb API. Here you will be able to read how I came up with the idea, the stages I went through and what I implented.

## Installation

If you want to use this project, you have to take these steps first.

Clone the repository

```
git clone ..
```

Install all node packages

```
npm install (or npm i)
```

Run node 

```
npm run dev
```

## The idea

The plan was to use the Moviedb API to make a movie streaming website (like netflix) that showcases trending movies/series, extras. Gives you the ability to search for movies, so you can get additional information.


## Proces log
### Week 1

I started with brainstorming about what kinda of app I was going to make and which API to use. I previously used the Rijksmuseum API, so i wanted to try something else now. The moviedb api looked interesting enough. 

So, currently the idea's I had in mind were:
- Using the Rijksmuseum api again, to make an art showcase.
- Streaming platform like Netflix, HBO with the TMDB.

I already had some experience with API, so I wanted to get started as soon as possible.

### Week 2 

Week 1 was a bit on the short side for API, so this is the week where I really started working on it. I wanted to start with the home page and making the connection to the API.

So first I tested the connection with the API.

```js
const fetchTrendingMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=${process.env.API_KEY}`);
    const movies = await response.json();
    console.log(movies);
    return movies;
}
```
In the code above I fetch a list of trending movies from the API from this week and console logging the results as test.

```js
app.get('/', async (req, res) => {
    try {
        const getMovies = await fetchTrendingMovies();
        res.render('pages/index', { title: "Home - Webflix", movies: getMovies.results}) 
    } catch (error) {
        console.log(error)
    }
 });
```
Next I tried to atleast showcase that list on the home page.

```js
 app.get('/*', async (req, res) => {
    try {
        res.render('pages/404', { title: "Webflix"}) 
    } catch (error) {
        console.log(error)
    }
 });
```
I also added a quick error routing. After that I worked on making the designs for the home page and details.

### Week 3 

This week was a bit of a slow week for me, I had a lot of responsibilities at my internship, so I couldn't find the time to work on this project properly, but I was able to atleast make the details page.

```js
 app.get('/movie/:id/', async (req, res) => {
    try {
        const movieID = req.params.id;
        const getDetails = await fetchDetails(movieID);
        const getRelated = await fetchRelatedMovies(movieID);
        const getReviews = await fetchReviews(movieID);
        res.render('pages/details', {title: getDetails.title + " - Webflix", details: getDetails, related: getRelated.results, reviews: getReviews.results})
    } catch (error) {
        console.log(error)
    }
 });
```
So here a used a few function to fetch multiple things; the specific movie, related movies and the reviews. I had the showcased, and worked a bit on the styling for those.

```js
const fetchDetails = async (movieID) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US&api_key=${process.env.API_KEY}`)
    const details = await response.json();
    return details;
}
```
Here's quickly the piece of code I used to fetch the specific movie. When clicking on a movie the movieid would appear in the URL and like that I was able to get the id from the url and make another fetch request.

### Week 4 (Final)

In the final week I wanted to specificly add a search function.

```js
const fetchSearchResults = async (searchQuery) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&page=1&api_key=${process.env.API_KEY}`);
    const searchResults = await response.json();
    return searchResults;
}

 app.get('/search', async (req, res) => {
     try {
        const searchQuery = req.query.query;
        const getSearchResults = await fetchSearchResults(searchQuery);
        console.log(searchQuery);
        res.render('pages/search', {title: "Webflix", results: getSearchResults.results, query: searchQuery})
    } catch (error) {
        console.log(error)
    }
 });
```
So I did so right here. Same concept as the details page, but this time when putting an input in de search it would go into the url aswell and it was able to get that query and use that in a fetch to get a list of similar results.

### Geolocation API 

I also wanted to add another web API. I thought it would be nice to use the geolocation api to find out in what region the current user is in and fetch some movies specificly from that region. 

This turned out to be harder than expected. I was able to get the geolocation api working, but I was only able to find out about my longitude and latitude.

```js
function getLocation() {
    if (navigator.geolocation) {
        try {
            navigator.geolocation.getCurrentPosition(test);
        } catch (error) {
            console.log('Unable to retrieve your location', error)
        }
    } else {
        console.log('Geolocation is not supported by your browser.');
    }
}

function test(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    convertToCountry(latitude, longitude);
    console.log(latitude, longitude);
}
```

### OpenCage API

So, I wanted to convert those coordinates to a region code (iso code). I found a way to do that with the OpenCage Api. I was able to pinpoint my location pretty accuratly (which is pretty scary) and convert that to an ISO-code. 

```js
function convertToCountry(lat, long) {
    const apiKey = '996ca33c42fd464dbec19f0261666e03'; 
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${apiKey}`;
    
    // Fetch data from the API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Extract country code from the API response
            const countryCode = data.results[0].components.country_code;
            const IsoCode = countryCode.toUpperCase();
            console.log(IsoCode);
        })
        .catch(error => console.error('Error:', error));
    }
```

Unfortunatly I was able to figure out in time how to use that ISO-code in my fetch. Which is a shame.

### Webanimation API (FAILED)

I also briefly tried to do something with the Webanimation API, but decided it wasn't that interesting and wasn't really working out anyways, so I scrapped that idea.

## Reflection

So, this was quite a journey with some difficult moments, especially due to my poor planning and time management. But overall it was a real eye opener and wake up call. I had to redo this course, and I wasn't really sure on how to approach this project, but because of this I got a better understand on both the API and nodejs, which is a WIN-WIN.

Althought i was able to finish what was require, I do think I was able to get more out of this project. Better use of the API, more creative designs, better user experience and responsiveness. It's all a bit.."meh". I do believe it is more than enough, but I know I could've done a lot more. 

### Design

Here are some screenshots of the web application:

![Home page](/public/images/home.png)

## Sources

* [The Movie Database - Getting started](https://developer.themoviedb.org/reference/intro/getting-started)
* [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API#examples)
* [OpenCage API](https://opencagedata.com/dashboard#geocoding)
*[]()
*[]()
*[]()

## License

This repository is licensed as [MIT](LICENSE)

© 2024 Mitchel Staal
