import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { CopyToClipboard } from "react-copy-to-clipboard";

const SuraTafsir = () => {
  const [ayaData, setAyaData] = useState({});
  const [tafsirData, setTafsirData] = useState({});
  const [tafsirBook, setTafsirBook] = useState("ar.muyassar");
  const [isLoading, setIsLoading] = useState(true);
  const { suraTafsirId } = useParams();

  const fetchAyaData = async () => {
    const api = await fetch(
      `https://api.alquran.cloud/v1/ayah/${suraTafsirId}`
    );
    const data = await api.json();

    setAyaData(data.data);
  };

  const fetchTafsirData = async () => {
    const api = await fetch(
      `https://api.alquran.cloud/v1/ayah/${suraTafsirId}/editions/${tafsirBook}`
    );
    const data = await api.json();

    setTafsirData(data.data);
  };

  useEffect(() => {
    fetchAyaData();
    fetchTafsirData();
    if (ayaData.text && tafsirData[0]) {
      setIsLoading(false);
      document.title = `فرقان أونلاين | تفسير الآية ${ayaData.numberInSurah} من ${ayaData.surah.name}`;
    } else {
      setIsLoading(true);
    }
  }, [ayaData, tafsirData, tafsirBook]);

  return !isLoading ? (
    <section className="sura-tafsir">
      <div className="container">
        <div className="aya-card">
          <p className="aya-text">
            <span className="aya-braket">﴿</span>
            {ayaData.text}
            <span className="aya-braket">﴾</span>
          </p>
          <span className="aya-info">
            ({ayaData.surah.name} - {ayaData.numberInSurah})
          </span>
        </div>
        <div className="tafsir-card">
          <div className="tafsir-btns">
            <button
              onClick={() => {
                setTafsirBook("");
                setTafsirBook("ar.muyassar");
              }}
              className={tafsirBook == "ar.muyassar" ? "active" : ""}
            >
              تفسير الميسر
            </button>
            <button
              onClick={() => {
                setTafsirBook("");
                setTafsirBook("ar.jalalayn");
              }}
              className={tafsirBook == "ar.jalalayn" ? "active" : ""}
            >
              تفسير الجلالين
            </button>
            <button
              onClick={() => {
                setTafsirBook("");
                setTafsirBook("ar.qurtubi");
              }}
              className={tafsirBook == "ar.qurtubi" ? "active" : ""}
            >
              تفسير القرطبي
            </button>
            <button
              onClick={() => {
                setTafsirBook("");
                setTafsirBook("ar.miqbas");
              }}
              className={tafsirBook == "ar.miqbas" ? "active" : ""}
            >
              تفسير ابن عباس
            </button>
            <button
              onClick={() => {
                setTafsirBook("");
                setTafsirBook("ar.baghawi");
              }}
              className={tafsirBook == "ar.baghawi" ? "active" : ""}
            >
              تفسير البغوي
            </button>
            <button
              onClick={() => {
                setTafsirBook("");
                setTafsirBook("ar.waseet");
              }}
              className={tafsirBook == "ar.waseet" ? "active" : ""}
            >
              التفسير الوسيط
            </button>
          </div>
          <div className="tafsir-text">
            {tafsirData[0].edition.identifier == tafsirBook ? (
              <>
                <CopyToClipboard text={tafsirData[0].text}>
                  <button className="aya-btn">
                    <i class="bi bi-clipboard"></i>
                  </button>
                </CopyToClipboard>
                {tafsirData[0].text}
              </>
            ) : (
              <div className="lds-ripple">
                <div></div>
                <div></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Loading />
  );
};

export default SuraTafsir;
