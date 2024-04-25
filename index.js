import express from 'express';
import dotenv from 'dotenv';

// dotenv
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
   res.render('pages/index') 
});

app.get('/', async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
 });


// server port setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening @ port ${PORT}`);
});

       
