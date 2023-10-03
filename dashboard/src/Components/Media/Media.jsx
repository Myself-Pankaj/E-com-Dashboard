import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNewVideo, getAllVideos } from '../../Redux/Media/MediaAction';

const Media = () => {
    const { videos } = useSelector((state) => state.media);

    const dispatch = useDispatch();
    const [newVideo, setNewVideo] = useState({
      title: '',
      description: '',
      videoUrl: '',
    });
  
    useEffect(() => {
      dispatch(getAllVideos());
    }, [dispatch]);
  
    const handleAddVideo = () => {
      dispatch(createNewVideo(newVideo)); // Dispatch the action to add a new video
      setNewVideo({ title: '', description: '', videoUrl: '' }); // Clear the input fields
    };
  
    const handleDeleteVideo = (videoId) => {
    //   dispatch(deleteVideo(videoId)); 
    };
  
    return (
      <div className="mediaContainer">
        <h2>Media</h2>
        <section>
        {videos && videos.length > 0 ? (
          <div>
            {videos.map((video) => (
              <div key={video._id} className="video-card">
                
                <h3>{video.title}</h3>
                <video controls width="300" height="200">
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                  
                <button onClick={() => handleDeleteVideo(video._id)}>
                  Delete Video
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No videos available</p>
        )}
        </section>
        </div>
    );
  };

export default Media