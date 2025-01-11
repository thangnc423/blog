import React, { useRef, useEffect } from 'react';

const AudioPlayer = () => {
    const audioRef = useRef(null);

    // set default volume to 7%
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.07;
        }
    }, []);

    return (
        <div className="fixed bottom-4 right-4 z-50 w-64 bg-white rounded-lg shadow-lg p-3">
        <audio
            id="currentJam" 
            ref={audioRef}
            controls
            autoPlay
            loop
            className="w-full"
        >
            <source src={require(".//music/Color Your Night.mp3")} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
        </div>
    );
};

export default AudioPlayer;