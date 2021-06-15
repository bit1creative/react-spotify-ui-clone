import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
// import Player from "./components/Player";
import "./maincontent.scss";
import { useEffect } from "react";

const MainContent = () => {
  const vh = window.innerHeight * 0.01;
  useEffect(() => {
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);
  return (
    <div className="main-page">
      <div className="main-page-content">
        <Router>
          <Sidebar></Sidebar>
          <Content></Content>
        </Router>
      </div>
      {/* <Player /> */}
    </div>
  );
};

export default MainContent;
