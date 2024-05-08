// config/cloudinary.js

const cloudinary = require('cloudinary').v2;

exports.cloudinaryConfig = () => {
    cloudinary.config({
        cloud_name: 'dnvy3sqrm',
        api_key: '275395923511578',
        api_secret: 'ZU8o5mMlsiKkMQ6AUtRt4FSQKqg'
    });
};
