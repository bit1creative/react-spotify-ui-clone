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
        <SectionView name={"Top Lists"} selector={"toplistsPlaylists"} />
        <SectionView name={"Mood"} selector={"moodPlaylists"} />
        <SectionView name={"Workout"} selector={"workoutPlaylists"} />
        <SectionView name={"Chill"} selector={"chillPlaylists"} />
        <SectionView name={"Hip Hop"} selector={"hiphopPlaylists"} />
        <SectionView name={"Pop"} selector={"popPlaylists"} />
      </div>
    </div>
  );
};

export default HomeView;
