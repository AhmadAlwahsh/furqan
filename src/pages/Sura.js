import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const Sura = () => {
  const [suraData, setSuraData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { suraId } = useParams();

  const fetchSuraData = async () => {
    const api = await fetch(
      `https://api.alquran.cloud/v1/surah/${suraId}/quran-uthmani`
    );
    const data = await api.json();

    setSuraData(data.data);
  };

  console.log(suraData);

  useEffect(() => {
    fetchSuraData();
    if (suraData.ayahs) {
      setIsLoading(false);
      document.title = `فرقان أونلاين | ${suraData.name}`;
    } else {
      setIsLoading(true);
    }
    document.querySelector("footer").style.display = "none";
  } , [suraData]);

  return !isLoading ? (
    <section className="sura-section">
      <div className="container">
        <div className="sura-card">
          <h1>{suraData.name}</h1>
          <div className="info">
            <p>
              مكان النزول :
              <span>
                {suraData.revelationType == "Medinan" ? "مدنية" : "مكية"}
              </span>
            </p>
            <p>
              عدد الآيات : <span>{suraData.numberOfAyahs}</span>
            </p>
            <p>
              الترتيب : <span>{suraData.number}</span>
            </p>
          </div>
          <p className="text">
            {suraData.ayahs.map((e) => {
              return (
                <>
                  <p>
                    {e.text}
                    <span className="aya-braket">﴿</span>
                    {e.numberInSurah}
                    <span className="aya-braket">﴾</span>
                  </p>
                  <br />
                </>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  ) : (
    <Loading />
  );
};

export default Sura;
