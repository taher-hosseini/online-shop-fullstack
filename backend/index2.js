const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = process.env.MONGODB_URI;
const client = new mongodb.MongoClient(uri);

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db("mydb");
        const collection = db.collection("posts");

        // Root route
        app.get('/', (req, res) => {
            res.send('Server is running.');
        });

        // Read all items
        app.get('/items', async (req, res) => {
            try {
                const items = await collection.find().toArray();
                res.json(items);
            } catch (err) {
                res.status(500).send(err);
            }
        });

        // Create a new item
        app.post('/items', async (req, res) => {
            try {
                const newUser = {
                    name: req.body.name,
                };
                const result = await collection.insertOne(newUser);
                res.status(201).json(result.ops[0]);
            } catch (err) {
                res.status(400).send(err);
            }
        });

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};

connectToDatabase();


