const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/testbd', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connexion à MongoDB réussie');
    } catch (err) {
        console.error('Erreur de connexion à MongoDB :', err);
    }
}

module.exports = connectDB;