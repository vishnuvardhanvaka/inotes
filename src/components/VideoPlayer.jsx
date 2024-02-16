import React, { useState, useEffect } from 'react';

const VideoPlayer = ({ subtitles, videoFile }) => {
    const [videoElement, setVideoElement] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (videoElement) {
            videoElement.addEventListener('timeupdate', handleTimeUpdate);
            return () => {
                videoElement.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, [videoElement]);

    const handleTimeUpdate = () => {
        setCurrentTime(videoElement.currentTime);
    };

    const renderSubtitles = () => {
        if (!subtitles) return null;

        return subtitles.map((subtitle, index) => {
            // Check if the current time falls within the subtitle time range
            if (currentTime >= subtitle.startTime && currentTime <= subtitle.endTime) {
                return (
                    <div key={index} style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>
                        {subtitle.text}
                    </div>
                );
            } else {
                return null;
            }
        });
    };

    return (
        <div style={{ position: 'relative' }}>
            <video controls ref={(ref) => setVideoElement(ref)}>
                <source src={videoFile} type="video/mp4" />
            </video>
            {renderSubtitles()}
        </div>
    );
};

export default VideoPlayer;
