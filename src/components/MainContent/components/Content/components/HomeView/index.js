import "./homeview.scss";
import FeaturedPlaylists from "./components/FeaturedPlaylistsShowcase";
import SectionView from "./components/SectionView";

const HomeView = () => {
  return (
    <div className="home-view-wrapper">
      <div className="home-view">
        <div className="home-view-header">
          <span className="title">Hello there!</span>
          <FeaturedPlaylists />
        </div>
        <SectionView name={"New Releases"} selector={"newReleases"} />
        {/* <SectionView name={"Made for you"} selector={"discoverWeekly"} /> */}
      </div>
    </div>
  );
};

export default HomeView;
