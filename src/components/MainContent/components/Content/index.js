import { Route, Switch } from "react-router-dom";
import UserInfo from "./components/UserInfo";
import PlaylistView from "./components/PlaylistView";
import HomeView from "./components/HomeView";
import "./content.scss";

const Content = () => {
  return (
    <div className="content">
      <UserInfo></UserInfo>
      <Switch>
        <Route exact path="/">
          <HomeView />
        </Route>
        <Route path="/(playlist|album)/:id" children={<PlaylistView />}></Route>
      </Switch>
    </div>
  );
};

export default Content;
