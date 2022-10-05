import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/signinPage" element={<SigninPage />} /> */}
        <Route path="/signupPage" element={<SignupPage />} />
        <Route path="/signinPage" element={<SigninPage />} />
      </Routes>
    </>
  );
}

export default App;
