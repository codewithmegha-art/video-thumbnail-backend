import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import {
  uploadVideo,
  getVideos,
  getVideoById
} from "../controllers/videoController.js";

import {
  generateThumbnails,
  selectThumbnail
} from "../controllers/thumbnailController.js";

const router = express.Router();

router.post("/upload", upload.single("video"), uploadVideo);

router.post("/:id/thumbnails/generate", generateThumbnails);

router.post("/:id/thumbnails/select", selectThumbnail);

router.get("/", getVideos);

router.get("/:id", getVideoById);

export default router;