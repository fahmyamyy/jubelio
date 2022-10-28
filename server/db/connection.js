import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();
const pgp = pgPromise({});

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || '5432'

const pgConnection = {
    host: host,
    port: port,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
}

const DB = pgp(pgConnection)

export default DB