import React, { useState, useRef, useEffect } from "react";
import { Controls } from "./Controls";
import { Spotify } from "./Spotify";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Player = ({ tracks }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);

  const { title, artist, image, audioSrc, color } = tracks[trackIndex];
  

  const [currImage, setImage] = useState(image);

  const audioRef = useRef(new Audio(audioSrc));

  const nextTrack = () => {
    trackIndex < tracks.length - 1
      ? setTrackIndex(trackIndex + 1)
      : setTrackIndex(0);
  };
  const prevTrack = () => {
    trackIndex - 1 < 0
      ? setTrackIndex(tracks.length - 1)
      : setTrackIndex(trackIndex - 1);
  };

  useEffect(() => {
    setImage(image);
  }, [trackIndex]);

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [trackIndex]);

  return (
    <div className="container">
      <div className="main_wrapper" style={{ backgroundColor: color }}>
        <div className="player_info">
          <LazyLoadImage
            className="track_pic"
            src={currImage}
            title={title}
            artist={artist}
            alt={"track"}
          />
          <h2>{title}</h2>
          <h3>
            <p>By </p> {artist}
          </h3>
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            nextTrack={nextTrack}
            prevTrack={prevTrack}
          />
        </div>
      </div>
      <Spotify className="spotify" tracks={tracks} trackIndex={trackIndex} />
    </div>
  );
};
