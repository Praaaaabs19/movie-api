const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/Movie'); // Ensure this path is correct

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection with improved error handling
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit process if DB connection fails
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Middleware for error handling
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({ message: err.message || 'Internal Server Error' });
};

// Create a new movie
app.post('/movies', async (req, res, next) => {
    try {
        if (!req.body.title || !req.body.genre || !req.body.releaseYear) {
            return res.status(400).json({ message: 'Title, genre, and releaseYear are required' });
        }
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        next(error);
    }
});

// Get all movies
app.get('/movies', async (req, res, next) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
});

// Get a movie by ID
app.get('/movies/:id', async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid movie ID' });
        }
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
});

// Update a movie by ID
app.patch('/movies/:id', async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid movie ID' });
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Update data cannot be empty' });
        }
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
});

// Delete a movie by ID
app.delete('/movies/:id', async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid movie ID' });
        }
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json({ message: 'Movie deleted successfully', movie });
    } catch (error) {
        next(error);
    }
});

// Global error handler middleware
app.use(errorHandler);
