import { Route, Switch } from "react-router-dom";
import UserInfo from "./components/UserInfo";
import PlaylistView from "./components/PlaylistView";
import "./content.scss";

const Content = () => {
  return (
    <div className="content">
      <UserInfo></UserInfo>
      <Switch>
        <Route path="/liked">
          <PlaylistView playlist={"likedSongs"} />
        </Route>
      </Switch>
    </div>
  );
};

export default Content;
