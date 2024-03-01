const bookController = require('./controllers/bookController');

async function routes(fastify, options) {
    fastify.register(bookController);
}

module.exports = routes;
