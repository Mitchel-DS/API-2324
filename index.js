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


// server port setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening @ port ${PORT}`);
});

       
