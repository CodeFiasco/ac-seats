const mongodbUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/ac-seats';

const mongoose = require('mongoose');
mongoose.connect(mongodbUrl);

const db = mongoose.connection;
db.on('error', (err) => console.error('db connection error:', err));
db.once('open', () => console.log('db connected'));

const models = require('./models.json');
const generateSchema = require('generate-schema').mongoose;

module.exports = {
    load: () => {
        models.forEach(model => {
            const schema = new mongoose.Schema(generateSchema(model.schema));
            global[model.name] = mongoose.model(model.name, schema);
        });
    }
}