import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Home from "./Pages/Home";
import Header from "./Components/Header/header";
import Login from "./Pages/Login";
import Footer from "./Components/Footer/footer";
import Profile from "./Pages/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact="true" path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
