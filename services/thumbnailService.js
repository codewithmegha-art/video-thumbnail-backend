import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import path from "path";
import Thumbnail from "../models/Thumbnail.js";
import Video from "../models/Video.js";

ffmpeg.setFfmpegPath(ffmpegPath);

export const generateMockThumbnails = async (videoId) => {

  const video = await Video.findById(videoId);

  const videoPath = path.join("uploads/videos", path.basename(video.videoUrl));

  const thumbnailFolder = "uploads/thumbnails";

  const thumbnails = [];

  return new Promise((resolve, reject) => {

    ffmpeg(videoPath)

      .on("filenames", async function (filenames) {

        for (let name of filenames) {

          const thumb = await Thumbnail.create({
            videoId,
            url: `/uploads/thumbnails/${name}`
          });

          thumbnails.push(thumb);

        }

      })

      .on("end", function () {
        resolve(thumbnails);
      })

      .on("error", reject)

      .screenshots({
        count: 4,
        folder: thumbnailFolder,
        filename: `thumb-${videoId}-%i.png`
      });

  });

};