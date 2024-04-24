import express from 'express';
import dotenv from 'dotenv';

// dotenv
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true}));

// ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

// server port setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening @ port ${PORT}`);
});

