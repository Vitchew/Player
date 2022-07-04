import React from "react"
import { IoMdPlay } from "react-icons/io";
import { IoIosPause } from "react-icons/io"
import { IoIosSkipBackward } from "react-icons/io"
import { IoIosSkipForward } from "react-icons/io"


export const Controls = ({isPlaying, setIsPlaying, nextTrack, prevTrack}) => {


    return (
        
        <div className="controls_wrapper">
            <div className="play_wrapper">
                <IoIosSkipBackward className="back" onClick={prevTrack}/>
                {isPlaying ? (<IoIosPause className="pause" onClick={()=>setIsPlaying(false)}/>):(<IoMdPlay className="play"  onClick={()=>setIsPlaying(true)}/>)}
                <IoIosSkipForward className="forward" onClick={nextTrack}/></div>
                
        </div>
        
        
    )
    
}