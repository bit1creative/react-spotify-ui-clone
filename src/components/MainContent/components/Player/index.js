import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentlyPlaying } from "store/slices/playerSlice";
import "./player.scss";

const CurrentlyPlayingSong = ({ song }) => {};

const Player = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.username);
  const playbackState = useSelector((state) => state.player.playbackState);
  const recentlyPlayed = useSelector((state) => state.player.recentlyPlayed);
  useEffect(() => {
    if (user) dispatch(fetchCurrentlyPlaying());
  }, [user]);
  return <div className="player"></div>;
};

export default Player;
