import React, { useState, useEffect, useContext } from "react";
import { AudioContext } from "../context/AudioContext";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Audio = () => {
  const [audioData, setAudioData] = useContext(AudioContext);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (audioData[0]) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
    document.title = "فرقان أونلاين | الموسوعة الصوتية";
  }, [audioData]);

  console.log(audioData);

  return isLoading ? (
    <Loading />
  ) : (
    <section className="audio">
      <div className="container">
        <h1 className="sp-head">المكتبة الصوتية</h1>
        <p className="bio">
          المكتبة الصوتية للقرآن الكريم , أكثر من 140 قارئ بختمات كاملة تليت
          بأكثر من 15 رواية صحيحة.
        </p>
        <input
          type="text"
          id="audio-search"
          placeholder="ابحث عن قارئ أو رواية"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="audio-grid">
          <div className="cards-grid">
            {audioData
              .filter((e) => {
                if (searchTerm == "") {
                  return e;
                } else if (
                  e.name.includes(searchTerm) ||
                  e.rewaya.includes(searchTerm)
                ) {
                  return e;
                }
              })
              .map((e) => {
                // Almusshaf-Al-Mo-lim
                return (
                  <Link className="card" to={`/audio/${e.id}`}>
                    <h3>
                      {e.name}{" "}
                      {e.Server.includes("Almusshaf-Al-Mojawwad") ? (
                        <span> (المجوّد) </span>
                      ) : (
                        ""
                      )}
                      {e.Server.includes("Almusshaf-Al-Mo-lim") ? (
                        <span> (المعلّم) </span>
                      ) : (
                        ""
                      )}
                    </h3>
                    <p>{e.rewaya} </p>
                    <Link to={`/audio/${e.id}`}>
                      <i className="bi bi-play-fill"></i>
                    </Link>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Audio;
