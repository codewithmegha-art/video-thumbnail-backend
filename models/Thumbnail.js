import mongoose from "mongoose";

const thumbnailSchema = new mongoose.Schema(
{
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video"
  },

  url: String,

  isPrimary: {
    type: Boolean,
    default: false
  }

},
{ timestamps: true }
);

export default mongoose.model("Thumbnail", thumbnailSchema);