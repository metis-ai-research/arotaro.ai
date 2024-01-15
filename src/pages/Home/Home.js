import "./Home.scss";
import NavBar from "../../components/NavBar.js";
import MainSection from "./MainSection.js";
export default function Home() {
  return (
    <div className="home-container">
      <NavBar />
      <MainSection />
    </div>
  );
}
