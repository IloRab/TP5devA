const Book = require('../models/bookModel');
const bookSchema = require('../schemas/bookSchema.json');

async function bookRoutes(fastify, options) {
    fastify.get('/books', {
        schema: {
            response: {
                200: {
                    type: 'array',
                    items: bookSchema
                }
            }
        },
        async handler(request, reply) {
            try {
                const books = await Book.find({}, { _id: 0, __v: 0 }).lean();
                reply.send(books);
            } catch (err) {
                reply.code(500).send(err);
            }
        }
    });

    fastify.get('/books/:id', {
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' }
                }
            },
            response: {
                200: bookSchema
            }
        },
        async handler(request, reply) {
            try {
                const book = await Book.findById(request.params.id, { _id: 0, __v: 0 }).lean();
                if (!book) {
                    reply.code(404).send('Livre non trouvé');
                    return;
                }
                reply.send(book);
            } catch (err) {
                reply.code(500).send(err);
            }
        }
    });

    fastify.post('/books', {
        schema: {
            body: bookSchema,
            response: {
                201: bookSchema
            }
        },
        async handler(request, reply) {
            try {
                const book = new Book(request.body);
                await book.save();
                reply.code(201).send(book);
            } catch (err) {
                reply.code(500).send(err);
            }
        }
    });


    fastify.put('/books/:id', {
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' }
                }
            },
            body: bookSchema,
            response: {
                200: bookSchema
            }
        },
        async handler(request, reply) {
            try {
                const book = await Book.findByIdAndUpdate(request.params.id, request.body, { new: true });
                if (!book) {
                    reply.code(404).send('Livre non trouvé');
                    return;
                }
                reply.send(book);
            } catch (err) {
                reply.code(500).send(err);
            }
        }
    });

    fastify.delete('/books/:id', {
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' }
                }
            },
            response: {
                200: {
                    type: 'string',
                    description: 'Livre supprimé avec succès'
                }
            }
        },
        async handler(request, reply) {
            try {
                const book = await Book.findByIdAndDelete(request.params.id);
                if (!book) {
                    reply.code(404).send('Livre non trouvé');
                    return;
                }
                reply.send('Livre supprimé avec succès');
            } catch (err) {
                reply.code(500).send(err);
            }
        }
    });
}

module.exports = bookRoutes;
