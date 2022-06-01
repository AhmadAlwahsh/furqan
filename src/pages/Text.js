import React, { useContext, useState, useEffect, useRef } from "react";
import Loading from "../components/Loading";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

const Text = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [randomAyaData, setRandomAyaData] = useState({});
  const [randomAya, setRandomAya] = useState(Math.floor(Math.random() * 6237));
  const textRef = useRef();

  const fetchRandomAyaData = async () => {
    const api = await fetch(
      `https://api.alquran.cloud/v1/ayah/${randomAya}/quran-uthmani`
    );
    const data = await api.json();

    setRandomAyaData(data.data);
  };

  //FOR SURAS/////////
  const [suras, setSuras] = useState({});

  const fetchSuras = async () => {
    const api = await fetch("https://api.alquran.cloud/v1/surah");
    const data = await api.json();

    setSuras(data.data);
  };

  ////////////////////

  useEffect(() => {
    fetchRandomAyaData();
    fetchSuras();
    if (randomAyaData.text && suras) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
    document.title = "فرقان أونلاين | الموسوعة النصية";
  }, [randomAyaData, randomAya , suras]);


  return !isLoading ? (
    <>
      <section className="text-section">
        <div className="container">
          <h1 className="sp-head">المكتبة النصية</h1>
          <p className="bio">
            آيات عشوائية وسور كاملة وأكثر من ذلك من المميزات الفريدة.
          </p>
          <div className="random-aya-box">
            <h2>آية عشوائية</h2>
            <div className="summary">
              آيات عشوائية من القرآن الكريم, إقرأها ولك الأجر بإذن الله
            </div>
            <p ref={textRef}>
              <span className="aya-braket">﴿</span>
              {randomAyaData.text}
              <span className="aya-braket">﴾</span>
            </p>
            <span className="aya-info">
              ({randomAyaData.surah.name} - {randomAyaData.numberInSurah})
            </span>
            <div className="btns">
              <button
                onClick={() => setRandomAya(randomAya - 1)}
                className="aya-btn"
              >
                <i className="bi bi-arrow-right"></i>
              </button>
              <button
                className="aya-btn"
                onClick={() => {
                  setRandomAya(Math.floor(Math.random() * 6237));
                }}
              >
                <i class="bi bi-arrow-repeat"></i>
              </button>
              <CopyToClipboard text={randomAyaData.text}>
                <button className="aya-btn">
                  <i class="bi bi-clipboard"></i>
                </button>
              </CopyToClipboard>
              <button
                onClick={() => setRandomAya(randomAya + 1)}
                className="aya-btn"
              >
                <i className="bi bi-arrow-left"></i>
              </button>
            </div>
          </div>
          <div className="suras-box">
            <h2>سور كاملة</h2>
            <div className="summary">النص الكامل لسور القرآن</div>
            <div className="suras">
              {suras.map((e) => {
                return (
                  <Link className="sura" to={`/text/${e.number}`}>
                    <h3>
                      <div className="ar">{e.name}</div>
                      <div className="en">{e.englishName}</div>
                    </h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <Loading />
  );
};

export default Text;