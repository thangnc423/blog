import './AudioPlayer.css'
import React, { useRef, useEffect, useState } from 'react';

const AudioPlayer = () => {
    const [songTitle] = useState("Persona 3 Reload - Color Your Night");
    const audioRef = useRef(null);

    // set default volume to 7%
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.07;
        }
    }, []);

    return (
        <div className="audio-player">
            <div className="song-title">{songTitle}</div>
            <audio
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