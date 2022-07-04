import React, { useState, useEffect } from "react";
import axios from "axios";
import spotify from "./Fonts/icons8-spotify-100.png";

export const Spotify = ({ tracks, trackIndex }) => {
  const { artist, color, id } = tracks[trackIndex];
  const [songs, setSongs] = useState();
  const [token, setToken] = useState("");

  const clientId = "";
  const clientSecret = "";

  
 

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      data: "grant_type=client_credentials",
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);
    });
  }, []);



  useEffect(() => {
    console.log("????");
    axios(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=PL`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((data) => setSongs(data.data.tracks));
  }, [id]);

 

  return (
    <div className="main_spotify">
      <h2>
        Top tracks by <p>{artist}</p>{" "}
        <img className="spotifyLogo" src={spotify} alt="spotify" />
      </h2>
      <ol className="list">
        {songs !== undefined ? (
          songs.map((song, index) => (
            <li style={{ backgroundColor: color }} key={index}>
              <a
                href={song.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={song.album.images[2].url} alt="album pic" />
                {song.name}
              </a>
            </li>
          ))
        ) : (
          <p>loading...</p>
        )}
      </ol>
    </div>
  );
};
