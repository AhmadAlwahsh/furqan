import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AudioProvider } from "./context/AudioContext";
import Header from "./components/Header";
import Landing from "./pages/Home";
import Audio from "./pages/Audio";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import Qaree from "./pages/Qaree";
import Text from "./pages/Text";
import Sura from "./pages/Sura";
import UpBtn from "./components/UpBtn";
import Tafsir from "./pages/Tafsir";
import SuraTafsir from "./pages/SuraTafsir";

function App() {
  return (
    <Router>
      <AudioProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/audio/:audioId" element={<Qaree />} />
          <Route path="/text" element={<Text />} />
          <Route path="/text/:suraId" element={<Sura />} />
          <Route path="/tafsir" element={<Tafsir />} />
          <Route path="/tafsir/:suraTafsirId" element={<SuraTafsir />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <UpBtn />
        <Footer />
      </AudioProvider>
    </Router>
  );
}

export default App;
