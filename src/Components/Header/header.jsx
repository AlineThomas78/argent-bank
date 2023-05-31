import argentBankLogo from "../../Assets/argentBankLogo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/authUser";

function Header() {
  const profile = useSelector((state) => state.user.profile);
  const isAuthenticated = useSelector((state) => state.user.token !== null);
  const dispatch = useDispatch();

  function SigneOut() {
    dispatch(logout());
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
              <FontAwesomeIcon icon={faCircleUser} className="" />
              {profile?.firstName || ""}
              <FontAwesomeIcon icon={faSignOutAlt} />
              <Link to="/" className="main-nav-item" onClick={SigneOut}>
                Sign Out
              </Link>
            </div>
          ) : (
            <div className="not-identified">
              <div className="font-not-identified">
                <FontAwesomeIcon icon={faCircleUser} />
                <Link to="/login" className="main-nav-item">
                  Sign In
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
