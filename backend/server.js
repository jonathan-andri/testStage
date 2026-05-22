import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import entityRoutes from './routes/entity.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares globaux
app.use(cors());
app.use(express.json());

//test
app.get('/', (req, res) => {
    res.json({ message: 'fonctionne!!!' });
});

//routes
app.use('/api/entities', entityRoutes);

//lancement serveur
app.listen(PORT, () => {
    console.log(`Serveur au port: ${PORT}`);
});