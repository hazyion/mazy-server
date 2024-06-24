import express from "express";
const router = express.Router();
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let ext;
    console.log(file)
    if (file.mimetype === "image/png") {
      ext = "png";
      cb(null, uniquePrefix + "." + ext);
    } else if (file.mimetype === "image/jpeg") {
      ext = "jpeg";
      cb(null, uniquePrefix + "." + ext);
    } else {
      cb(new Error("Invalid file type"), "");
    }
  },
});

const customUpload = multer({ storage: storage });

import { getContent, postContent, postImage } from "./controllers/controller";

router.route("/test").get(getContent);
router.route("/test").post(postContent);
router.use(customUpload.any()).route("/image").post(postImage);

export default router;
