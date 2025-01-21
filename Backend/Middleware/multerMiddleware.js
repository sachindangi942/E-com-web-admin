const multer = require('multer');
const path = require('path');

const uploadPath = path.resolve(__dirname,"../uploadedFiles");
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath); 
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG and PNG files are allowed!'), false);
    }
};

const uploadFile = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
    fileFilter,
});

module.exports = uploadFile;
