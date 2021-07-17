import "./login.scss";
import logo from "assets/spotify-logo.png";

const Login = ({ loginUrl }) => {
  return (
    <div className="login">
      <img src={logo} alt="Spotify Logo" />
      <div className="credentials-wrapper">
        <div className="credentials-box">
          <span className="credentials-title">
            Due to the Spotify policy this app has a developer status, so please
            consider using the following credentials for login:
          </span>
          <div className="email-title">
            Email:{" "}
            <span className="email">hrytsenko.ivan@student.uzhnu.edu.ua</span>
          </div>
          <div className="password-title">
            Password: <span className="password">qwertyuiop112233</span>
          </div>
        </div>
      </div>
      <a href={loginUrl}>Login via Spotify</a>
    </div>
  );
};

export default Login;
