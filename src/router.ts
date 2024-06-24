import express from 'express';
const router = express.Router();
import multer from 'multer';

const upload = multer({dest: 'uploads/'})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const customUpload = multer({ storage: storage })

import { getContent, postContent, postImage } from './controllers/controller';

router.route('/test').get(getContent);
router.route('/test').post(postContent);
router.use(customUpload.any()).route('/image').post(postImage);

export default router;
