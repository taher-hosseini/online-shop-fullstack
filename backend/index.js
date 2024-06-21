const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = process.env.MONGODB_URI || "mongodb+srv://taher:taher@cluster0.05owt1n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new mongodb.MongoClient(uri);
const secretKey = process.env.JWT_SECRET || "b0bd39a8f1a7832547581bacf112c3ea017c56d142a03cfddc422e24abbed1d2";

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db("mydb");
        const usersCollection = db.collection("users");
        const postsCollection = db.collection("posts");

        // Root route
        app.get('/', (req, res) => {
            res.send('Server is running.');
        });

        // User registration
        app.post('/register', [
            body('name').notEmpty().withMessage('Name is required'),
            body('username').notEmpty().withMessage('Username is required'),
            body('email').isEmail().withMessage('Enter a valid email'),
            body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        ], async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10); // هش کردن رمز عبور

            try {
                const user = {
                    name,
                    username,
                    email,
                    password: hashedPassword
                };
                const result = await usersCollection.insertOne(user);
                res.status(201).json({ message: 'User registered successfully' });
            } catch (err) {
                res.status(400).send(err);
            }
        });


        // User login
        app.post('/login', async (req, res) => {
            const { email, password } = req.body;
            console.log("username received:", email);

            try {
                const user = await usersCollection.findOne({ email });
                console.log("user found:", user);
                if (!user) {
                    return res.status(400).json({ message: 'Invalid email or password 1' });
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(400).json({ message: 'Invalid email or password 2' });
                }

                const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
                res.json({ token });
            } catch (err) {
                console.error('Error during login:', err);
                res.status(500).send(err);
            }
        });


        // Middleware for verifying token
        const authenticateToken = (req, res, next) => {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (token == null) return res.sendStatus(401);

            jwt.verify(token, secretKey, (err, user) => {
                if (err) return res.sendStatus(403);
                req.user = user;
                next();
            });
        };

        // Read all posts
        app.get('/items', async (req, res) => {
            try {
                const posts = await postsCollection.find().toArray();
                res.json(posts);
            } catch (err) {
                res.status(500).send(err);
            }
        });

        // Create a new post
        app.post('/items', authenticateToken, async (req, res) => {
            try {
                const newPost = {
                    title: req.body.title,
                    content: req.body.content,
                    author: req.user.userId
                };
                const result = await postsCollection.insertOne(newPost);
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
