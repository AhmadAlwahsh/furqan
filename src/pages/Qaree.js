import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { AudioContext } from "../context/AudioContext";

const Qaree = () => {
  const [audioData, setAudioData] = useContext(AudioContext);
  const [isLoading, setIsLoading] = useState(true);
  const [suraId, setSuraId] = useState("0");
  const { audioId } = useParams();

  //FOR SURAS/////////
  const [suras, setSuras] = useState({});

  const fetchSuras = async () => {
    const api = await fetch("https://api.alquran.cloud/v1/surah");
    const data = await api.json();

    setSuras(data.data);
  };

  useEffect(() => {
    fetchSuras();
  }, []);
  ////////////////////

  ///FOR LOADING//////
  useEffect(() => {
    if (audioData[0] && suras[0]) {
      setIsLoading(false);
      audioData
        .filter((e) => {
          return e.id == audioId;
        })
        .map((e) => {
          document.title = `فرقان أونلاين | ${e.name}`;
        });
    } else {
      setIsLoading(true);
    }
    document.querySelector('footer').style.display = 'none';
  }, [audioData, suras]);
  ////////////////////

  console.log(suras);
  console.log(suraId);

  let activeQaree;
  if (audioData[0]) {
    activeQaree = audioData.filter((e) => e.id == audioId);
  }

  return !isLoading ? (
    <section className="qaree-section">
      <div className="container">
        {audioData
          .filter((e) => {
            return e.id == audioId;
          })
          .map((e) => {
            return (
              <>
                <div className="qaree-grid">
                  <div className="text-box">
                    <h1>{e.name}</h1>
                    <p>{e.rewaya}</p>
                  </div>
                  <div className="suras">
                    {suras.map((e) => {
                      return (
                        <div
                          className="sura"
                          onClick={() => setSuraId(e.number + "")}
                        >
                          <h3>
                            <div className="ar">{e.name}</div>{" "}
                            <div className="en">{e.englishName}</div>
                          </h3>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })}
        <AudioPlayer
          audioSrc={`${activeQaree[0].Server}/${suraId.padStart(3, 0)}.mp3`}
        />
      </div>
    </section>
  ) : (
    <Loading />
  );
};

const AudioPlayer = ({ audioSrc }) => {
  console.log(audioSrc);
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef(); // reference our audio component
  const progressBar = useRef(); // reference our progress bar
  const animationRef = useRef(); // reference the animation

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value - 5);
    changeRange();
  };

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value + 5);
    changeRange();
  };

  return (
    <div className="audio-player">
      <div className="progressAndTime">
        {/* current time */}
        <div className="currentTime">{calculateTime(currentTime)}</div>

        {/* progress bar */}
        <div className="progress-bar">
          <input
            type="range"
            className="progressBar"
            defaultValue="0"
            ref={progressBar}
            onChange={changeRange}
          />
        </div>

        {/* duration */}
        <div className="duration">
          {duration > 0
            ? "00:00" && !isNaN(duration) && calculateTime(duration)
            : "00:00"}
        </div>
      </div>

      <div className="buttons">
        <audio ref={audioPlayer} src={audioSrc} preload="metadata"></audio>
        <button className="" onClick={backThirty}>
          <i className="bi bi-arrow-left"></i> 5
        </button>
        <button onClick={togglePlayPause} className="">
          {isPlaying ? (
            <i className="bi bi-pause-fill"></i>
          ) : (
            <i className="bi bi-play-fill"></i>
          )}
        </button>
        <button className="" onClick={forwardThirty}>
          5 <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Qaree;
