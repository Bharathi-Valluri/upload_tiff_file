const router = require('express').Router()
const multer = require('multer')
const tiff_to_png = require('tiff-to-png')
const path = require('path')
const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (_req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  }
})

var upload = multer({
  storage: storage,
  limits: {
    fields: 5,
    fieldNameSize: 50, // TODO: Check if this size is enough
    fieldSize: 20000, //TODO: Check if this size is enough
    // TODO: Change this line after compression
    fileSize: 1200000
  },
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb)
  }
})
function checkFileType (file, cb) {
  // Allowed ext

  const filetypes = /jpeg|jpg|png|tiff|gif/
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime
  const mimetype = filetypes.test(file.mimetype)
  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Error: Images Only!')
  }
}
router.post(
  '/readFile',
  upload.fields([{ name: 'profile' }, { name: 'avatar' }]),
  (req, res) => {
    res.send('file save successfully..')
  }
)

// converting tiff file to png format
const options = {
  logLevel: 1
}

const converter = new tiff_to_png(options)
const tiffsLocation = ['source/uploads/file-1669885431273.tiff']
const location = './uploads'
converter.convertArray(tiffsLocation, location)
router.post(
  '/convertToPng',
  converter.convertArray(tiffsLocation, location),
  (req, res) => {
    res.status(200).json({
      message: 'tiff converted into PNG successfully'
    })
  }
)

module.exports = router
