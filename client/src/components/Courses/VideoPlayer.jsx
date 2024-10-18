import React from 'react';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div>
      <video controls src={videoUrl}>
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
