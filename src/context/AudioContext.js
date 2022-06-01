import React, { createContext, useState, useEffect } from "react";

export const AudioContext = createContext();

export const AudioProvider = (props) => {
  const [audioData, setAudioData] = useState({});

  const fetchAudioData = async () => {
    const api = await fetch("https://mp3quran.net/api/_arabic.json");
    const data = await api.json();

    setAudioData(
      data.reciters.filter((e) => {
        return e.count == 114;
      })
    );
  };

  useEffect(() => {
    fetchAudioData();
  }, []);
  return (
    <AudioContext.Provider value={[audioData, setAudioData]}>
      {props.children}
    </AudioContext.Provider>
  );
};
