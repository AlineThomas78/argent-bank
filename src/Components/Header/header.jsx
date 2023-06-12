import argentBankLogo from "../../Assets/argentBankLogo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/authUser";

function Header() {
  const profile = useSelector((state) => state.user.profile);
  const isAuthenticated = window.localStorage.getItem("loginToken");
  const dispatch = useDispatch();

  function SigneOut() {
    dispatch(logout());
    window.localStorage.removeItem("loginToken");
    console.log(isAuthenticated);
  }

  return (
    <>
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div className="main-authenticated">
          {isAuthenticated ? (
            <div className="authenticated">
              <Link to="/profile">
                <FontAwesomeIcon icon={faCircleUser} className="" />
                <div className="user_name">{profile?.firstName || ""}</div>
              </Link>

              <Link to="/" className="main-nav-item" onClick={SigneOut}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <div className="signButton">Sign Out</div>
              </Link>
            </div>
          ) : (
            <div className="not-identified">
              <div className="font-not-identified">
                <Link to="/login" className="main-nav-item">
                  <FontAwesomeIcon icon={faCircleUser} />
                  <div className="signButton">Sign In</div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
export default Header;
