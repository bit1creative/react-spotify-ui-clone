import "./sectionview.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SectionCard = ({ el }) => {
  const isAlbum = el.type === "album";
  return (
    <Link to={`/${isAlbum ? "album" : "playlist"}/${el.id}`}>
      <button className="section-card">
        <img
          src={el.images[0].url}
          alt="section album/playlist cover"
          className="section-card-image"
        />
        <div className="section-info">
          <span className="section-name">{el.name}</span>
        </div>
      </button>
    </Link>
  );
};

export const SectionView = ({ name, selector, isSearch = false }) => {
  const items = useSelector((state) =>
    isSearch
      ? state?.search?.result?.[selector]?.items
      : state.playlists?.[selector]?.albums?.items ||
        state.playlists?.[selector]?.playlists?.items
  );
  return (
    <div className="section-view">
      {name ? <span className="title">{name}</span> : null}
      <SkeletonTheme
        color="rgba(255, 255, 255, 0.1)"
        highlightColor="rgba(255, 255, 255, 0.5)"
      >
        {items ? (
          <div className="horizontal-scroll">
            <div className="section-view-cards">
              {items.map((el) => (
                <SectionCard key={el.id} el={el} />
              ))}
            </div>
          </div>
        ) : (
          <Skeleton width={"100%"} height={"13em"} />
        )}
      </SkeletonTheme>
    </div>
  );
};

export default SectionView;
