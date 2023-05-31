import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchProfile,
  fetchProfileError,
  fetchProfileSuccess,
  login,
  loginError,
  loginSuccess,
} from "../../Redux/authUser";
import { useNavigate } from "react-router-dom";

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerHandle = (e) => {
    e.preventDefault();
    signIn({ email, password });
    console.log(email, password);
  };


  async function signIn(credentials) {
    try {
      dispatch(login(credentials));
      // on utilise fetch pour faire la requête
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (data.status !== 200) {
        throw data;
      }
      dispatch(loginSuccess(data.body.token));
      navigate("/profile");
      getProfile(data.body.token);
    } catch (error) {
      dispatch(loginError(error));
    }
  }

  async function getProfile(token) {
    try {
      dispatch(fetchProfile());
      // on utilise fetch pour faire la requête
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.status !== 200) {
        throw data;
      }
      dispatch(fetchProfileSuccess(data.body));
    } catch (error) {
      dispatch(fetchProfileError(error));
    }
  }

  return (
    <>
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faCircleUser} />
        <h1>Sign In</h1>

        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="email"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button className="sign-in-button" onClick={registerHandle}>
            Sign in
          </button>
        </form>
      </section>
    </>
  );
}
export default FormLogin;
