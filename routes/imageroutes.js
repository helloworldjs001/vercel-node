// routes/imageRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage, getAllImages, deleteImage, updateImageTitle } = require('../controllers/imagecontrollers');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), uploadImage);
router.get('/', getAllImages);

router.put('/:id', updateImageTitle); // Add route for updating image title
router.delete('/:id', deleteImage);   // Add route for deleting image
// Implement other routes for update and delete operations

module.exports = router;
