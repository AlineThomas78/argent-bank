import { useSelector } from "react-redux";
import CardProfile from "../../Components/Profile";

function Profile() {
  const profile = useSelector((state) => state.user.profile);
  return (
    <>
      <div className="container">
        <main className="main bg-dark">
          <div className="header">
            <h1>
              Welcome back
              <br />
              {profile?.firstName || ""} {profile?.lastName || ""}
            </h1>
            <button className="edit-button">Edit Name</button>
          </div>
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
