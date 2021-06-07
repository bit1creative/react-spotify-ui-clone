import "./login.scss";
import logo from "assets/spotify-logo.png";

const Login = ({ loginUrl }) => (
  <div className="login">
    <img src={logo} alt="Spotify Logo" />
    <a href={loginUrl}>Login via Spotify</a>
  </div>
);

export default Login;
