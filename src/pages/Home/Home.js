import "./Home.scss";
import NavBar from "../../components/NavBar.js";
import MainSection from "./MainSection.js";
import PeopleCardSection from "./PeopleCardSection.js";
import ReviewSection from "./ReviewSection.js";

export default function Home() {
  return (
    <div className="home-container">
      <NavBar />
      <MainSection />
      <PeopleCardSection />
      <ReviewSection />
    </div>
  );
}
