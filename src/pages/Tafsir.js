import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Tafsir = () => {
  const [ayasData, setAyasData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [ayasArray, setAyasArray] = useState([]);

  const fetchAyasData = async () => {
    const api = await fetch(
      "https://api.alquran.cloud/v1/quran/quran-simple-clean"
    );
    const data = await api.json();

    setAyasData(data.data.surahs);
  };

  console.log(document.querySelectorAll(".tafsir-section .card"));

  useEffect(() => {
    fetchAyasData();
    if (ayasData[0]) {
      setIsLoading(false);
      ayasData.map((e) => {
        e.ayahs.map((el) => {
          ayasArray.push([el , e.name]);
        });
      });
    } else {
      setIsLoading(true);
    }
    document.title = "فرقان أونلاين | موسوعة التفسير";
  }, [ayasData]);




  return !isLoading ? (
    <section className="tafsir-section">
      <div className="container">
        <h1 className="sp-head">مكتبة التفسير</h1>
        <p className="bio">
          الميسر والجلالين وأكثر من ذلك من كتب التفسير الفريدة بشروح منفصلة
          لجميع آيات القرآن الكريم.
        </p>
        <input
          type="text"
          id="audio-search"
          placeholder="ابحث عن آية معينة"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <h3 className="results-number">
          عدد النتائج التي تطابق بحثك هو{" "}
          <span>
            {document.querySelectorAll(".tafsir-section .card").length}
          </span>{" "}
          نتيجة.
        </h3>
        <div className="cards-grid">
          {ayasArray
            .slice(0, 6237)
            .filter((e) => {
              if (searchTerm == "" || searchTerm.length <= 3) {
                return false;
              } else if (e[0].text.includes(searchTerm)) {
                return e;
              }
            })
            .map((e) => {
              return (
                <Link className="card" to={`/tafsir/${e[0].number}`}>
                  <h3>
                    <span className="aya-braket">﴿</span>
                    {e[0].text}
                    <span className="aya-braket">﴾</span>
                  </h3>
                  <div className="aya-info">
                    ({e[1]} - {e[0].numberInSurah})
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  ) : (
    <Loading />
  );
};

export default Tafsir;
