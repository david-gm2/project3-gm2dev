import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header.jsx";
import { Home } from "./pages/Home.jsx";
import { Auth } from "./pages/Auth.jsx";

import "./styles/App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
