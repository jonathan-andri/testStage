const express = require('express');
const cors = require('cors');
const prisma = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares globaux
app.use(cors());
app.use(express.json());

//test
app.get('/', (req, res) => {
    res.json({ message: 'fonctionne!!!' });
});

//lacement serveur
app.listen(PORT, () => {
    console.log(`Serveur au port: ${PORT}`);
})