const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { cloudinaryConfig } = require("./config")
const imageRoutes = require('./routes/imageroutes');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const cron = require('node-cron');

const app = express();

app.use(cors())
app.use(morgan("dev"))

// Connect to MongoDB
mongoose.connect('mongodb+srv://abc:abc@cluster0.wkd0emg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {});

// Configure Cloudinary
cloudinaryConfig();

// Middleware
app.use(express.json());

// Routes
app.use('/api/images', imageRoutes);

app.get("/test", (req, res) => {
    res.json("working")
})

// Start server
const PORT = process.env.PORT || 5000;




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Define cron job to hit the API every minute
cron.schedule('* * * * *', () => {
    console.log('Cron job running...');
    axios.get('https://vercel-node-aby4.onrender.com/test')
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error creating report:');
        });
});


