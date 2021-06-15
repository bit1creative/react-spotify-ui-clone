import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
// import Player from "./components/Player";
import "./maincontent.scss";

const MainContent = () => {
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
