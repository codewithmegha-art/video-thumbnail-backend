import Thumbnail from "../models/Thumbnail.js";
import Video from "../models/Video.js";
import asyncHandler from "../utils/asyncHandler.js";

export const generateThumbnails = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const thumbnails = [];

  for (let i = 1; i <= 4; i++) {

    const thumb = await Thumbnail.create({

      videoId: id,

      url: `https://picsum.photos/seed/${id}-${i}/300/200`

    });

    thumbnails.push(thumb);

  }

  res.json(thumbnails);

});


export const selectThumbnail = asyncHandler(async (req, res) => {

  const { id } = req.params;
  const { thumbnailId } = req.body;

  await Thumbnail.updateMany(
    { videoId: id },
    { isPrimary: false }
  );

  const selected = await Thumbnail.findByIdAndUpdate(

    thumbnailId,

    { isPrimary: true },

    { new: true }

  );

  await Video.findByIdAndUpdate(id, {

    primaryThumbnail: thumbnailId

  });

  res.json(selected);

});