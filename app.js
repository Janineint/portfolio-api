//const { MongoClient } = require('mongodb');

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
app.use(cors());

console.log("Starting Portfolio API...\n", process.env.DATABASE_URL);

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
      console.error('MongoDB connection error:', err.message);
      // console.error(err);
  });

// Middleware
// v-- Add this line HERE --v
app.use(express.json()); // Parses incoming requests with JSON payloads
// ^-- Add this line HERE --^

app.use(bodyParser.urlencoded({ extended: true })); // For parsing URL-encoded form data (used by admin forms)
app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

// Routes
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api'); // Make sure apiRoutes is required

app.use('/admin', adminRoutes);
app.use('/api', apiRoutes); // Ensure this line is AFTER app.use(express.json());

// Home page (optional)
app.get('/', (req, res) => {
  // res.send('Welcome to the Portfolio API');
  res.render("admin/index");
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
