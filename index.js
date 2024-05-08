// index.js

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { cloudinaryConfig } = require("./config")
const imageRoutes = require('./routes/imageroutes');
const cors = require('cors');

const app = express();

app.use(cors())

// Connect to MongoDB
mongoose.connect('mongodb+srv://abc:abc@cluster0.wkd0emg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {

});

// Configure Cloudinary
cloudinaryConfig();

// Middleware
app.use(express.json());

// Routes
app.use('/api/images', imageRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
