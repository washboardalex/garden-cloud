import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex';
import morgan from 'morgan';

import { signinAuthentication } from './controllers/signin';
import requireAuth from './controllers/authorization';
import handleRegister from './controllers/register'
import {getGarden, updateGarden} from './controllers/garden';

//Database Setup
const db = knex({
    client: 'pg',
    connection: process.env.POSTGRES_URI
});

const app = express();

const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/api/signin', signinAuthentication(db, bcrypt));
app.post('/api/register', (req, res) => { handleRegister(req, res, db, bcrypt) })
app.get('/api/garden/:id', requireAuth, (req, res) => { getGarden(req, res, db)});
app.post('/api/garden/:id', requireAuth, (req, res) => { updateGarden(req, res, db) })

app.listen(3001, ()=> {
    console.log('app is running on port 3001');
});

  