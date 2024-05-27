import React, { useRef, useState } from 'react';
import '../assets/css/VideoModal.css';

const VideoModal = ({ movie, onClose }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(false);

    const togglePlayPause = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(videoRef.current.duration);
    };

    const handleProgressClick = (e) => {
        const progressBar = e.target;
        const rect = progressBar.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const newTime = (offsetX / progressBar.offsetWidth) * duration;
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <div
                    className="video-container"
                    onMouseEnter={() => setShowControls(true)}
                    onMouseLeave={() => setShowControls(false)}
                >
                    <video
                        ref={videoRef}
                        className="video-element"
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        controls={false}
                    >
                        <source src={`/movie/${movie.id}.mp4`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className={`controls ${showControls ? 'show' : ''}`}>
                        <button className="control-button" onClick={togglePlayPause}>
                            {isPlaying ? '⏸' : '▶️'}
                        </button>
                        <div className="progress-bar" onClick={handleProgressClick}>
                            <div
                                className="progress"
                                style={{ width: `${(currentTime / duration) * 100}%` }}
                            ></div>
                        </div>
                        <div className="time-container">
                            <span className="time-text">{formatTime(currentTime)}</span>
                            <span className="time-text">{formatTime(duration)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;
