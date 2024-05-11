const multer = require("multer");
const path = require("path");

const destinationDir = path.join(__dirname, '../public/images');

const storeImage = () => {
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null,destinationDir);
        },
        filename: function(req, file, cb) {
            cb(null, `${Date.now()}_${file.originalname}`);
        }
    });
    const upload = multer({ storage });
    return upload;
}

module.exports = storeImage