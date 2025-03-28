import express from 'express';
import cors from 'cors';
import { ItemRoute } from './Routes/ItemRoute.mjs';

const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use('/', ItemRoute );

app.listen(8082, () => {
    console.log('Server is Running on port 8082');
});
