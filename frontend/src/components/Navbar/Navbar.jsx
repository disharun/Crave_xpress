import React, { useState, useContext, useEffect, useRef } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { getTotalCartAmount, token, setToken, userName } = useContext(StoreContext); // Assuming userName is set in StoreContext
  const navigate = useNavigate();
  const url = "http://localhost:4000";
  const [imageUrl, setImageUrl] = useState("");

  const debounceTimeout = useRef(null);
  const imageUr = imageUrl.image ? `http://localhost:4000/images/${imageUrl.image}` : assets.defaultImage;

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      if (query.length > 2) {
        try {
          const response = await axios.get(`${url}/api/food/search`, {
            params: { q: query },
          });
          if (response.data && response.data.data) {
            setSearchResults(response.data.data);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);
  };

  const handleSearchResultClick = (foodItemId) => {
    navigate(`/food/${foodItemId}`);
    setShowSearch(false);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={assets.logo} alt="Logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mob-app")}
          className={menu === "mob-app" ? "active" : ""}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact")}
          className={menu === "contact" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        {userName && (
          <div className="greeting">
            <span className="greeting-text">Welcome, {userName}!</span>
          </div>
        )}
        <img
          src={assets.search_icon}
          alt="Search Icon"
          onClick={() => setShowSearch(!showSearch)}
          className="search-icon"
        />
        {showSearch && (
          <>
            <div
              className="backdrop"
              onClick={() => setShowSearch(false)}
            ></div>
            <div className="search-modal">
              <input
                type="text"
                placeholder="Search here..."
                className="search-input"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button
                onClick={() => setShowSearch(false)}
                className="close-search"
              >
                ✖
              </button>

              {searchQuery && (
                <div className="search-results">
                  {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <div
                        key={result._id}
                        className="search-item"
                        onClick={() => handleSearchResultClick(result._id)}
                      >
                        <div className="food-info">
                          <img src={result.imageUr} alt={imageUrl.name} />
                          <p>{result.name}</p>
                          <p className="price">₹{result.price}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-results">No Results Found</p>
                  )}
                </div>
              )}
            </div>
          </>
        )}
        <Link to="/cart" className="navbar-search-icon">
          <img src={assets.basket_icon} alt="Cart" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile Icon" />
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
