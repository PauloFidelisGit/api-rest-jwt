import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getAll } from './src/controllers/getAll';
import login from './src/controllers/login';
import { checkToken } from './src/middleware';
import helmet from 'helmet';

dotenv.config();

const server = express();

server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(helmet());

server.post('/api/login', login);

server.use(checkToken);

const path = '/api/'
server.post(path + 'getall', getAll);

server.use('*', (req, res) => {
    res.status(404).json({ error: '404' });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Servidor online na porta ${port}!`);
});