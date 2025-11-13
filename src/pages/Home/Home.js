import { useState } from "react";
import "./Home.scss";
import NavBar from "../../components/NavBar.js";
import MainSection from "./MainSection.js";
import PeopleCardSection from "./PeopleCardSection.js";
import ReviewSection from "./ReviewSection.js";
import GlobalFooter from "../../components/GlobalFooter.js";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [language, setLanguage] = useState("한국어");
  const { i18n } = useTranslation();

  return (
    <div className={`home-container lang-${i18n.language}`}>
      <NavBar />
      <MainSection />
      <PeopleCardSection />
      <ReviewSection />
      <GlobalFooter setLanguage={setLanguage} language={language} />
    </div>
  );
}
