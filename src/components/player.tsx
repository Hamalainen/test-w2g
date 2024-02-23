"use client";
// ts
import React from "react";
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube";
import { useState, useEffect } from "react";
import socket from "../api/socketApi";
import { playerAction, playerMessage } from "../interfaces/playerMessages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeLow,
  faVolumeOff,
} from "@fortawesome/free-solid-svg-icons";

let playerEvent: YouTubeEvent<any>;
export default function Player(room: any) {
  const [progressTime, setProgressTime] = useState(Number);
  const [playing, setPlaying] = useState(Boolean);
  const [volume, setVolume] = useState(Number);
  useEffect(() => {
    socket.on("update-playerState", (msg: playerMessage) => {
      if (msg.action == playerAction.Pause) {
        playerEvent.target.pauseVideo();
        playerEvent.target.seekTo(
          getCurrentTime(
            playerEvent.target.getDuration(),
            msg.currentTimePercentage
          )
        );
        setPlaying(false);
        setProgressTime(msg.currentTimePercentage);
      } else if (msg.action == playerAction.Play) {
        playerEvent.target.playVideo();
        playerEvent.target.seekTo(
          getCurrentTime(
            playerEvent.target.getDuration(),
            msg.currentTimePercentage
          )
        );
        setPlaying(true);
        setProgressTime(msg.currentTimePercentage);
        progressTimer();
      }
    });
    return () => {
      socket.off("update-playerState");
    };
  }, []);
  useEffect(() => {
    socket.on("update-playerProgress", (msg: playerMessage) => {
      console.log(msg);
      playerEvent.target.seekTo(
        getCurrentTime(
          playerEvent.target.getDuration(),
          msg.currentTimePercentage
        )
      );
      setProgressTime(msg.currentTimePercentage);
    });
    return () => {
      socket.off("update-playerProgress");
    };
  }, []);

  useEffect(() => {
    socket.on("update-video", (msg: playerMessage) => {
      playerEvent.target.loadVideoById(msg.currentVideo);
      playerEvent.target.seekTo(
        getCurrentTime(
          playerEvent.target.getDuration(),
          msg.currentTimePercentage
        )
      );
      playerEvent.target.playVideo();
      setPlaying(true);
      setProgressTime(msg.currentTimePercentage);
      progressTimer();
    });
    return () => {
      socket.off("update-video");
    };
  }, []);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    setVolume(10);
    playerEvent = event;
    playerEvent.target.pauseVideo();
    playerEvent.target.setVolume(volume);
    document.getElementById("playbutton")?.click();
    setTimeout(() => {
      document.getElementById("playbutton")?.click();
    }, 1);
  };

  const playPause = () => {
    let message: playerMessage = {
      roomId: room.room,
      currentTimePercentage: progressTime,
    };
    if (playing) {
      message.action = playerAction.Pause;
      socket.emit("playerState-change", message);
    } else if (!playing) {
      message.action = playerAction.Play;
      socket.emit("playerState-change", message);
    }
  };
  const getCurrentTime = (duration: number, progressPercentage: number) => {
    return duration * (progressPercentage / 100);
  };
  const onVolumeChange = (e: any) => {
    setVolume(e.target.value);
    playerEvent.target.setVolume(volume);
  };
  const onProgressChange = (e: any) => {
    setPlaying(false);
    playerEvent.target.pauseVideo();
    setProgressTime(e.target.value);
  };
  const progressTimer = () => {
    let interval = setInterval(() => {
      setProgressTime(
        (playerEvent.target.getCurrentTime() /
          playerEvent.target.getDuration()) *
          100
      );
      if (!playing) {
        clearInterval(interval);
      }
    }, 250);
  };
  const onProgressMouseUp = () => {
    let message: playerMessage = {
      roomId: room.room,
      currentTimePercentage: progressTime,
      action: playerAction.Play,
    };
    socket.emit("playerState-change", message);
    socket.emit("playerProgress-change", message);
  };
  const onVideoEnd = () => {
    setPlaying(false);
  };
  const opts: YouTubeProps["opts"] = {
    height: "548",
    width: "900",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      disablekb: 1,
    },
  };

  return (
    <div className="w-900 h-548">
      <YouTube
        videoId="DLXwnPMbivE"
        opts={opts}
        onReady={onPlayerReady}
        onEnd={onVideoEnd}
        className="pointer-events-none"
      />

      <div className="flex flex-row px-4 justify-between gap-4 bg-gray-950">
        {playing ? (
          <button className="p-4" id="playbutton" onClick={playPause}>
            <FontAwesomeIcon icon={faPause} />
          </button>
        ) : (
          <button className="p-4" id="playbutton" onClick={playPause}>
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
        <input
          className="w-640"
          type="range"
          id="progress-slider"
          value={progressTime}
          onChange={onProgressChange}
          onMouseUp={onProgressMouseUp}
        />
        <div className="flex flex-row justify-between self-center w-150">
          {volume == 0 && (
            <FontAwesomeIcon icon={faVolumeOff} className="align-middle" />
          )}
          {volume > 0 && volume < 50 && (
            <FontAwesomeIcon icon={faVolumeLow} className="align-middle" />
          )}
          {volume > 50 && (
            <FontAwesomeIcon icon={faVolumeHigh} className="align-middle" />
          )}
          <input
            type="range"
            id="volume-slider"
            defaultValue={10}
            onChange={onVolumeChange}
          />
        </div>
      </div>
    </div>
  );
}
