import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true
  },

  description: String,

  tags: [String],

  videoUrl: {
    type: String,
    required: true
  },

  primaryThumbnail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thumbnail"
  }

},
{ timestamps: true }
);

export default mongoose.model("Video", videoSchema);