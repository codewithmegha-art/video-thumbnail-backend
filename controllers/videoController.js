import Video from "../models/Video.js";
import asyncHandler from "../utils/asyncHandler.js";
import Thumbnail from "../models/Thumbnail.js";

export const uploadVideo = asyncHandler(async (req, res) => {

  const { title, description, tags } = req.body;

  const video = await Video.create({

    title,
    description,

    tags: tags ? tags.split(",") : [],

    videoUrl: `/uploads/videos/${req.file.filename}`

  });

  res.status(201).json(video);

});

export const getVideos = asyncHandler(async (req, res) => {

  const videos = await Video.find()
    .populate("primaryThumbnail")
    .sort({ createdAt: -1 });

  res.json(videos);

});

export const getVideoById = asyncHandler(async (req, res) => {

  const video = await Video.findById(req.params.id)
    .populate("primaryThumbnail");

  const thumbnails = await Thumbnail.find({
    videoId: req.params.id
  });

  res.json({
    video,
    thumbnails
  });

});