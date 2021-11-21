import './userisnotindashboard.scss'
import {setToken} from "../../store/slices/tokenSlice";
import {useDispatch} from "react-redux";

const UserIsNotInDashboard = () => {
    const dispatch = useDispatch()
    return (
        <div className="error-message">
            <span>Logged user is not is spotify's developer dashboard. <br/>
            In order to view the website consider using the credentials at login page. <br/>
            <a
                href="/"
                onClick={() => {
                    dispatch(setToken(null));
                }}
            >
                Go to login page.
            </a></span>
        </div>
    )
}

export default UserIsNotInDashboard