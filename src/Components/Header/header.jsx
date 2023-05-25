import argentBankLogo from "../../Assets/argentBankLogo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/authUser";


function Header() {
  const isAuthenticated = useSelector((state) => state.user.token !== null);
  const dispatch = useDispatch();

  // const handleLogout = () => {
  //   logout();
    
  // };

  function SigneOut() {
    dispatch(logout())
    console.log(isAuthenticated)
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
        <div>
        {isAuthenticated ? (
          <Link to="/" className="main-nav-item" onClick={SigneOut}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Sign Out
          </Link>
        ) : (
          <Link to="/login" className="main-nav-item">
            <FontAwesomeIcon icon={faCircleUser} />
            Sign In
          </Link>
        )}
        </div>
      </nav>
    </>
  );
}
export default Header;
