const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const articleRoutes = require('./routes/articleRoutes');


dotenv.config();

const app = express();


app.use(cors());

// Middleware for parsing JSON data
app.use(express.json());

// Database connection 
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Failed to connect to MongoDB:', err));


app.use('/api', articleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
