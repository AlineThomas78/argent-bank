import { useDispatch, useSelector } from "react-redux";
import CardProfile from "../../Components/Profile";
import { useEffect, useState } from "react";
import {
  fetchProfile,
  fetchProfileError,
  fetchProfileSuccess,
  putProfile,
  putProfileError,
  putProfileSuccess,
} from "../../Redux/authUser";
import { useNavigate } from "react-router-dom";

function Profile() {
  const profile = useSelector((state) => state.user.profile);
  const token = useSelector((state) => state.user.token);

  const [isInEditMode, setIsInEditMode] = useState(false);
  const [firstName, setFirstName] = useState(profile?.firstName);
  const [lastName, setLastName] = useState(profile?.lastName);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(profile);

  const handleEditClick = () => {
    setIsInEditMode(true);
  };

  const updateProfile = (e) => {
    e.preventDefault();
    console.log(firstName, lastName);
    updatedProfile(firstName, lastName);
  };

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

  async function updatedProfile(firstName, lastName) {
    try {
      dispatch(putProfile());
      // on utilise fetch pour faire la requête
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
          }),
        }
      );
      const data = await response.json();
      if (data.status !== 200) {
        throw data;
      }
      dispatch(putProfileSuccess({ firstName, lastName }));
      dispatch(fetchProfile());
      setIsInEditMode(false); // pour sortir du mode d'édition
    } catch (error) {
      dispatch(putProfileError(error));
    }
  }

  useEffect(() => {
    const token = window.localStorage.getItem("loginToken")
    if (!token) {
      navigate("/login");
    }else {
      getProfile(token)
    }
  }, []);

  return (
    <>
      <div className="container">
        <main className="main bg-dark">
          {isInEditMode ? (
            <div className="header">
              <div className="edit">
                <h1>
                  {" "}
                  Welcome back <br />
                </h1>
                <div className="containerInput">
                  <div className="editInput">
                    <input
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                      className="edit-input"
                      value={firstName || ""}
                    />
                    <input
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                      className="edit-input"
                      value={lastName || ""}
                    />
                  </div>
                </div>
                <div className="containerEdit">
                  <div className="editButton">
                    <button
                      type="submit"
                      onClick={updateProfile}
                      className="btn"
                    >
                      Save
                    </button>
                    <button
                      className="btn"
                      onClick={() => setIsInEditMode(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="header">
              <h1>
                Welcome back
                <br />
                {profile?.firstName} {profile?.lastName}
              </h1>

              <button className="edit-button" onClick={handleEditClick}>
                Edit Name
              </button>
            </div>
          )}

          <h2 className="sr-only">Accounts</h2>

          <CardProfile
            title="Argent Bank Checking (x8349)"
            account="$2,082.79"
            text="Available Balance"
          />
          <CardProfile
            title="Argent Bank Savings (x6712)"
            account="$10,928.42"
            text="Available Balance"
          />

          <CardProfile
            title="Argent Bank Credit Card (x8349)"
            account="$184.30"
            text="Current Balance"
          />
        </main>
      </div>
    </>
  );
}
export default Profile;
