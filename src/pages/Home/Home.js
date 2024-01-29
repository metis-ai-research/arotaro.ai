import { useState } from "react";
import "./Home.scss";
import NavBar from "../../components/NavBar.js";
import MainSection from "./MainSection.js";
import PeopleCardSection from "./PeopleCardSection.js";
import ReviewSection from "./ReviewSection.js";
import GlobalFooter from "../../components/GlobalFooter.js";

export default function Home() {
  const [langurage, setLangurage] = useState("한국어");
  return (
    <div className="home-container">
      <NavBar />
      <MainSection />
      <PeopleCardSection />
      <ReviewSection />
      <GlobalFooter setLangurage={setLangurage} langurage={langurage} />
    </div>
  );
}
