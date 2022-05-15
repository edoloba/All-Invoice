const multer = require('multer');
require('express-session');

const multerConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/avatars');
    },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1];
        callback(null, `${req.session.user.logoAvatar}.${ext}`);
    },
});

const isImage = (req, file, callback) => {
    if(file.mimetype.startsWith('image')){
        callback(null, true);
    } else {
        callback(new Error('Only Image is allowed'));
    }
}
const upload = multer({
    storage: multerConfig,
    fileFilter: isImage,
});


exports.uploadImage = upload.single('photo')


exports.upload = (req, res) => {
    console.log(req.file);

    res.status(200).json({
        success: 'success'
    })
}