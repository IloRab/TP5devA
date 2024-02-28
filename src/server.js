const fastify = require('fastify')();
const connectDB = require('./databases');
const Book = require('./bookModel');

// Connexion à MongoDB
connectDB();

fastify.post('/books', async (request, reply) => {
    try {
        const book = new Book(request.body);
        await book.save();
        reply.send(book);
    } catch (err) {
        reply.code(500).send(err);
    }
});

fastify.get('/books', async (request, reply) => {
    try {
        const books = await Book.find();
        reply.send(books);
    } catch (err) {
        reply.code(500).send(err);
    }
});

fastify.delete('/books/:id', async (request, reply) => {
    try {
        await Book.findByIdAndDelete(request.params.id);
        reply.send('Livre supprimé avec succès');
    } catch (err) {
        reply.code(404).send('Livre non trouvé');
    }
});

// Démarrage du serveur Fastify
fastify.listen(3000, '0.0.0.0')
    .then(() => console.log('Serveur démarré sur le port 3000'))
    .catch(err => console.error('Erreur de démarrage du serveur :', err));