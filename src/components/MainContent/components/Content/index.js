import { Route, Switch } from "react-router-dom";
import UserInfo from "./components/UserInfo";
import PlaylistView from "./components/PlaylistView";
import HomeView from "./components/HomeView";
import LibraryView from "./components/LibraryView";
import CreatePlaylistsView from "./components/CreatePlaylistView";
import SearchView from "./components/SearchView";
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
        <Route exact path="/library">
          <LibraryView />
        </Route>
        <Route exact path="/create-playlist">
          <CreatePlaylistsView />
        </Route>
        <Route exact path="/search">
          <SearchView />
        </Route>
      </Switch>
    </div>
  );
};

export default Content;
