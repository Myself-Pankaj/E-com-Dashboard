import mongoose from "mongoose";

const featuredVideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  vedioUrl: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const FeaturedVideo = mongoose.model("FeaturedVideo", featuredVideoSchema);
