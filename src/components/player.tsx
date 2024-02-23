
"use client"
// ts
import React from 'react';
import YouTube, { YouTubeEvent, YouTubePlayer, YouTubeProps } from 'react-youtube';
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { playerMessages } from '../interfaces/playerMessages';
let socket:any;
let playing:boolean = false
let playerEvent: YouTubeEvent<any>
export default function Player(videoCode:any) {
    const [input, setInput] = useState('')
   
    useEffect(() => {socketInitializer()}, [])
  
    const socketInitializer = async () => {
      await fetch('/api/socket');
      socket = io()
  
      socket.on('connect', () => {
        console.log('connected')
      })
       socket.on('update-input', (msg:playerMessages) => {
      if(msg == playerMessages.Pause){
        playing = false
        playerEvent.target.pauseVideo();
      }
      else if(msg == playerMessages.Play){
        playerEvent.target.playVideo();
        playing = true
      }


    })

    }
    

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    console.log("ready")
    playerEvent = event;
    playerEvent.target.pauseVideo();
  }



  const playPause = () =>  {
    if(playing)
    {
      socket.emit('input-change', playerMessages.Pause)
    }
    else if(!playing)
    {
      socket.emit('input-change', playerMessages.Play)
    }
  }
  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (<div>
    <YouTube videoId={videoCode.videoCode} opts={opts} onReady={onPlayerReady}/>
    <button onClick={playPause}>play/pause</button>
  </div>

  );
}
