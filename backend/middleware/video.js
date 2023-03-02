const multer = require('multer');
// const catchAsyncErrors = require('./catchAsyncErrors');

// const imageStorage = multer.diskStorage({
//     destination: (req,file,cb)=>{
//         cb(null,'images');
//     },
//     filename:(req,file,cb)=>{
//         cb(null, file.originalname);
//     }
// })

const videoStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'videos');
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname);
    }
})

// const imageUpload = multer({
//     storage:imageStorage,
//     fileFilter(req,file,cb){
//         if (!file.originalname.match(/\.(png|jpg)$/)) { 
//             return cb(new Error('Please upload an Image'))
//         }
//         cb(undefined, true)
//     }
// });

const videoUpload = multer({
    storage:videoStorage,
    fileFilter(req,file,cb){
        if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
            return cb(new Error('Please upload a Video'))
         }
        cb(undefined, true)
    }
});

const upload = {
    // imageUpload,
    videoUpload
}

// exports.imgUpload = catchAsyncErrors(async (req, res, next) => {
//     imageUpload.single("thumbnail");
//     next();
// });

// exports.vidUpload = catchAsyncErrors(async (req, res, next) => {
//     videoUpload.single("vid");
//     next();
// });
  
module.exports = upload;