import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";

const Landing = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    document.title = "فرقان أونلاين | الموسوعة الشاملة للقرآن الكريم";
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  
  return !isLoading ? (
    <>
      <section className="landing">
        <div className="overlay"></div>
        <div className="container">
          <div className="text-box">
            <h2>
              <span>﴿</span> تَبَارَكَ الَّذِي نَزَّلَ{" "}
              <span>الْفُرْقَانَ </span>
              عَلَىٰ عَبْدِهِ لِيَكُونَ لِلْعَالَمِينَ نَذِيرًا<span>﴾</span>
            </h2>
            <p className="summary">الموسوعة الشاملة للقرآن الكريم</p>
          </div>
        </div>
      </section>
      <Fadl />
      <section className="libs">
        <div className="container">
          <div className="lib-card">
            <h3>المكتبة النصية</h3>
            <p>آيات عشوائية وسور كاملة وأكثر من ذلك من المميزات الفريدة.</p>
            <a href="/text">
              اطّلع عليها
              <i className="bi bi-arrow-left"></i>
            </a>
          </div>
          <div className="lib-card">
            <h3>المكتبة الصوتية</h3>
            <p>
              المكتبة الصوتية للقرآن الكريم , أكثر من 140 قارئ بختمات كاملة تليت
              بأكثر من 15 رواية صحيحة.
            </p>
            <a href="/audio">
              اطّلع عليها
              <i className="bi bi-arrow-left"></i>
            </a>
          </div>
          <div className="lib-card">
            <h3>مكتبة التفسير</h3>
            <p>الميسر والجلالين وأكثر من ذلك من كتب التفسير الفريدة بشروح منفصلة لجميع آيات القرآن الكريم.</p>
            <a href="/tafsir">
              اطّلع عليها
              <i className="bi bi-arrow-left"></i>
            </a>
          </div>
        </div>
      </section>
    </>
  ) : (
    <Loading />
  );
};

const Fadl = () => {
  return (
    <section className="fadl">
      <div className="container">
        <div className="quran">
          <div className="fadl-card">
            <h3 className="quran-fadl-title">
              <span>﴿</span> إِنَّ الَّذِينَ يَتْلُونَ كِتَابَ اللَّهِ
              وَأَقَامُوا الصَّلَاةَ وَأَنْفَقُوا مِمَّا رَزَقْنَاهُمْ سِرًّا
              وَعَلَانِيَةً يَرْجُونَ تِجَارَةً لَنْ تَبُورَ <span>﴾</span>
            </h3>
          </div>
          <div className="fadl-card">
            <h3 className="quran-fadl-title">
              <span>﴿</span> إِنَّمَا الْمُؤْمِنُونَ الَّذِينَ إِذَا ذُكِرَ
              اللَّهُ وَجِلَتْ قُلُوبُهُمْ وَإِذَا تُلِيَتْ عَلَيْهِمْ آَيَاتُهُ
              زَادَتْهُمْ إِيمَانًا وَعَلَى رَبِّهِمْ يَتَوَكَّلُونَ
              <span>﴾</span>
            </h3>
          </div>
          <div className="fadl-card">
            <h3 className="quran-fadl-title">
              <span>﴿</span> الَّذِينَ آَتَيْنَاهُمُ الْكِتَابَ يَتْلُونَهُ
              حَقَّ تِلَاوَتِهِ أُولَئِكَ يُؤْمِنُونَ بِهِ وَمَنْ يَكْفُرْ بِهِ
              فَأُولَئِكَ هُمُ الْخَاسِرُونَ <span>﴾</span>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;

// <section className="whoIam">
//   <div className="container">
//     <div className="who-box">
//       <img src={Me} alt="أحمد الوحش" />
//       <h3>
//         <span className="ar">أحمد الوحش</span>
//         <span className="en">Ahmad Alwahsh</span>
//       </h3>
//       <p>مطور واجهات أمامية , يمكنك التواصل معي عبر الروابط الآتية</p>
//       <div className="icon-box">
//         <a href="https://web.facebook.com/AhmadAlwahsh07">
//           <i className="bi bi-facebook"></i>
//         </a>
//         <a href="https://twitter.com/AhmadAlwahsh07">
//           <i className="bi bi-twitter"></i>
//         </a>
//         <a href="https://instagram.com/ahmadalwahsh007/">
//           <i className="bi bi-instagram"></i>
//         </a>
//         <a href="https://github.com/AhmadAlwahsh2007">
//           <i className="bi bi-github"></i>
//         </a>
//       </div>
//     </div>
//   </div>
// </section>
