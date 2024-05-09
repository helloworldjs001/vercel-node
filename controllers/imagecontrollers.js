// controllers/imageController.js

const Image = require('../models/Image');
const cloudinary = require('cloudinary').v2;

exports.uploadImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);
        const newImage = new Image({
            title: req.body.title,
            imageUrl: result.secure_url
        });
        await newImage.save();
        res.json(newImage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllImages = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Current page number, default is 1
        const limit = parseInt(req.query.limit) || 100; // Number of items per page, default is 10

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages / limit);

        const images = await Image.find().limit(limit).skip(startIndex);

        // Pagination metadata
        const pagination = {
            currentPage: page,
            totalPages: totalPages,
            totalImages: totalImages
        };

        // Check if there's a next page
        if (endIndex < totalImages) {
            pagination.next = {
                page: page + 1,
                limit: limit
            };
        }

        // Check if there's a previous page
        if (startIndex > 0) {
            pagination.previous = {
                page: page - 1,
                limit: limit
            };
        }

        res.json({
            images: images,
            pagination: pagination
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateImageTitle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const updatedImage = await Image.findByIdAndUpdate(id, { title }, { new: true });
        res.json(updatedImage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findByIdAndDelete(id);
        console.log(image);
        const parts = image.imageUrl.split('/');
        const imageNameWithExtension = parts[parts.length - 1];
        const imageNameWithoutExtension = imageNameWithExtension.split('.')[0];
        console.log(imageNameWithoutExtension);
        cloudinary.uploader
            .destroy(imageNameWithoutExtension)
            .then(result => console.log(result));
        res.json({ message: 'Image deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
