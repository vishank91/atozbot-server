function generateUploader(folder) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/Generated/' + folder)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname)
        }
    })
    return multer({ storage: storage })
}

module.exports = {
    imageUploader: generateUploader("image"),
    videoUploader: generateUploader("video"),
    musicUploader: generateUploader("music"),
    speechUploader: generateUploader("speech")
}