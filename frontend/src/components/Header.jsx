import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/Header.css";

export function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [showUser, setShowUser] = useState(false);

  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/">
          <img src="icons/icon-logo.svg" alt="" />
          <h2>MINECRAFT FANDOM</h2>
        </Link>
      </div>

      <form className="search-bar">
        <img
          src="icons/icon-user.svg"
          alt="user icon"
          onClick={() => {
            setShowUser(!showUser);
            setShowSearch(false);
          }}
        />

        <div className={`auth-buttons ${showUser ? "open" : ""}`}>
          <button>
            <Link to="/auth?mode=login" className="auth-btn">
              Log in
            </Link>
          </button>

          <button>
            <Link to="/auth?mode=signin" className="auth-btn">
              Sign in
            </Link>
          </button>
        </div>

        <img
          src="icons/icon-search.svg"
          alt="search icon"
          onClick={() => {
            setShowSearch(!showSearch);
            setShowUser(false);
          }}
        />

        <div className={`search-box ${showSearch ? "open" : ""}`}>
          <input
            type="search"
            placeholder="Creeper..."
            className="only-mobile"
            name="search"
          />
        </div>
      </form>
    </header>
  );
}
