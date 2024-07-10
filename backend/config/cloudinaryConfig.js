// config/cloudinaryConfig.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dfsuaxlsl",
  api_key: "555833997914171",
  api_secret: "PsDmWct1jXjWh3_CrWIhmilGlCk",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "food-delivery",
    allowed_formats: ["jpg", "png"],
  },
});

module.exports = { cloudinary, storage };
