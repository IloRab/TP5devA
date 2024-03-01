// server.js
const fastify = require('fastify')();
const routes = require('./routes');


fastify.register(routes);

const start = async () => {
    try {
        await fastify.listen(3000);
        console.log('Serveur Fastify démarré sur le port 3000');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
