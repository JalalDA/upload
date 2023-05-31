const multer = require('multer')
const path = require('path')


const storageMulter = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, './original')
    },
    filename : (req, file, cb)=>{
        console.log({file});
        const suffix = `${Date.now()}`
        const filename = `${file.fieldname}-${suffix}${path.extname(file.originalname)}`
        req.filename = filename
        cb(null, filename)
    }
})

const upload = multer({
    storage : storageMulter,
    fileFilter : (req, file, cb)=>{
        if (file.mimetype.split("/")[1] === "mp4") {
            cb(null, true);
          } else {
            cb(new Error("Not a MP4 File!!"), false);
          }   
    },
})


module.exports = upload