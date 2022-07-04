
import './scss/App.scss';
import React from "react";
import {Player} from "./Player";
import {tracks} from "./Tracks.js";



const App = () =>  <Player className="player" tracks={tracks} />
            
    


export default App;
