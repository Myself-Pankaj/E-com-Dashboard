import cloudinary from "cloudinary";
import { FeaturedVideo } from "../models/featuredVedioModel.js";
import fs from "fs";


export const featureVideoUpload = async (req, res) => {
  try {
    const { title, description } = req.body;

    const {vedioUrl} = req.files;
    if (!title || !vedioUrl || !vedioUrl.tempFilePath) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing in the request",
      });
    }

   const myCloud = await cloudinary.v2.uploader.upload(vedioUrl.tempFilePath, {
            folder: "Featured Vedio",
            resource_type: "video",
        });
        fs.rmSync("./tmp", { recursive: true });
    
    

    const featuredVideo = await FeaturedVideo.create({
      title,
      description,
      vedioUrl: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
    },
    });

    res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
      featuredVideo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to upload video",
      error: error.message,
    });
  }
};





export const getAllFeaturedVideos = async (req, res) => {
    try {
        const featuredVideos = await FeaturedVideo.find();

        const videosWithUrls = featuredVideos.map((video) => ({
            _id: video._id,
            title: video.title,
            description: video.description,
            videoUrl: video.vedioUrl.url, // Update the field name to 'vedioUrl'
        }));

        res.status(200).json({
            success: true,
            message: "Featured videos retrieved successfully",
            videos: videosWithUrls,
        });
    } catch (error) {
        console.error("Error retrieving featured videos:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve featured videos",
            error: error.message,
        });
    }
};






export const deleteFeatureVideo = async (req, res) => {
    try {
      const videoId = req.params.id;
  
      // Find the video in the database
      const featuredVideo = await FeaturedVideo.findById(videoId);
  
      // Check if the video exists
      if (!featuredVideo) {
        return res.status(404).json({
          success: false,
          message: 'Video not found',
        });
      }
    
      const featuredMedia = featuredVideo.vedioUrl.public_id;
      
      // Delete the video from Cloudinary
      const deleteResult = await cloudinary.v2.uploader.destroy(featuredMedia, {resource_type: 'video'});
  
      // Check if Cloudinary deletion was successful
      if (deleteResult.result !== 'ok') {
        return res.status(500).json({
          success: false,
          message: 'Failed to delete video from Cloudinary',
        });
      }
  
      // Delete the video from the database
      await FeaturedVideo.findByIdAndDelete(videoId);
  
      res.status(200).json({
        success: true,
        message: 'Video deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting video:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete video',
        error: error.message,
      });
    }
  };
  

  
  