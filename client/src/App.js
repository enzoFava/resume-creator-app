import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import PersonalData from "./components/pages/PersonalData";
import Skills from "./components/pages/Skills";
import Education from "./components/pages/Education";
import Experience from "./components/pages/Experience";

function App() {
  const [pdfData, setPdfData] = useState(null);
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personal-data" element={<PersonalData setPdfData={setPdfData} setIsDataSubmitted={setIsDataSubmitted} />} />
        <Route path="/skills" element={<Skills setPdfData={setPdfData} setIsDataSubmitted={setIsDataSubmitted} />} />
        <Route path="/education" element={<Education setPdfData={setPdfData} setIsDataSubmitted={setIsDataSubmitted} />} />
        <Route path="/experience" element={<Experience setPdfData={setPdfData} setIsDataSubmitted={setIsDataSubmitted} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;