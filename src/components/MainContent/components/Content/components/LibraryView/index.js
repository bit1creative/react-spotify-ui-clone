import "./libraryview.scss";
import LibraryPlaylistsView from "./components/LibraryPlaylistsView";
// import LibraryArtistsView from "./components/LibraryArtistsView";

const LibraryView = () => {
  return (
    <div className="library-view">
      <LibraryPlaylistsView />
      {/* <LibraryArtistsView /> */}
    </div>
  );
};

export default LibraryView;
