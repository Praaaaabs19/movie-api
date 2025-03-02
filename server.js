const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/Movie'); // Ensure this path is correct

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Create a new movie
app.post('/movies', async (req, res) => {
  try {
    const movie = new Movie(req.body); // Ensure Movie is correctly imported
    await movie.save();
    res.status(201).send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all movies
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send(movies);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a movie by ID
app.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).send({ message: 'Movie not found' });
    }
    res.send(movie);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a movie by ID
app.patch('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!movie) {
      return res.status(404).send({ message: 'Movie not found' });
    }
    res.send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a movie by ID
app.delete('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).send({ message: 'Movie not found' });
    }
    res.send({ message: 'Movie deleted successfully', movie });
  } catch (error) {
    res.status(500).send(error);
  }
});