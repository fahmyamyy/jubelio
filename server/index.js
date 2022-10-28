import Hapi from '@hapi/hapi';
import migrate, { initialFetch } from './db/init.js';
import { getRoutes, createRoutes } from './routes/routes.js';

const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
        cors: {
            origin: ['*'], // an array of origins or 'ignore'
            headers: ['Authorization'], // an array of strings - 'Access-Control-Allow-Headers'
            exposedHeaders: ['Accept'], // an array of exposed headers - 'Access-Control-Expose-Headers',
            additionalExposedHeaders: ['Accept'], // an array of additional exposed headers
            maxAge: 60,
            credentials: true // boolean - 'Access-Control-Allow-Credentials'
        }
    }
});

migrate()
server.route(getRoutes());
server.route(createRoutes());

// server.route(
//     {
//         method: 'GET',
//         path: '/',
//         handler: (req, h) => {
//             return getProduct();
//         }
//     }
// );


server.start();
console.log('Server running on', server.info.uri);