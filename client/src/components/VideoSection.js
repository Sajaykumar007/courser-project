// import React, { useState } from 'react';

// function VideoSection() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const youtubeVideoId = "Z2ZQaMr2CS8";
//   const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeVideoId}`;

//   const openYouTube = () => window.open(youtubeUrl, '_blank');
//   const playOnWebsite = () => setIsPlaying(true);
//   const closeVideo = () => setIsPlaying(false);
//   const handleVideoClick = () => window.open(youtubeUrl, '_blank');

//   return (
//     <div className="right-section">
//       {!isPlaying ? (
//         <div className="video-box">
//           <div className="video-header">
//             <div className="logo-small">COURSER</div>
//             <span>Overview of Web Developer | Introduction to Web Development</span>
//           </div>
          
//           <div className="thumbnail" onClick={openYouTube}>
//             <h2>Overview</h2>
//             <h1>Web Developer</h1>
//             <div className="play-btn">▶</div>
//             <p className="click-hint">Click to open on YouTube</p>
//           </div>

//           <div className="video-footer">
//             <div className="btn-group">
//               <button className="action-btn btn-youtube" onClick={openYouTube}>Watch on YouTube</button>
//               <button className="action-btn btn-website" onClick={playOnWebsite}>Play on Website</button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="video-container">
//           <div className="video-header">
//             <div className="logo-small">COURSER</div>
//             <span>Web Developer Course Overview</span>
//             <button className="close-btn" onClick={closeVideo}>✕ Close</button>
//           </div>
          
//                     <div className="video-player">
//             <iframe
//               width="100%"
//               height="100%"
//               src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=0&controls=1&rel=0`}
//               title="Web Developer Course"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default VideoSection;