import React, { useContext, useEffect, useState } from "react";
import "../scss/header.css";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/DarkModeContext";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import Img from "../../assets/pic-4.jpg";
import { useRef } from "react";

const Header = (props) => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const munu = props.activeMenu;

  // Functions Variables
  const [menuOpenV, setMenuOpenV] = useState(null);

  const id = currentUser.id;

  const getDetailsPro = async () => {
    try {
      await axios
        .get("http://localhost:3030/api/auth/login?id=" + id)
        .then((response) => {
          const details = response.data;
          setData(details);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetailsPro();
  }, []);

  if (data) {
    if (data.length) {
      var name = data[0].name;
      var image = data[0].image;
    }
  }

  return (
    <>
      <header className="header">
        <section className="flex">
          <Link to="/home" className="logo">
            Educa.
          </Link>
          <form action="" className="search-form" method="post">
            <input
              type="text"
              name="search_course"
              id=""
              placeholder="Search Courses..."
              required
              maxLength="100"
            />
            <button
              type="submit"
              className="fas fa-search"
              name="search_course_btn"
            ></button>
          </form>

          <div className="icons">
            <div id="menu-btn" className="fas fa-bars"></div>
            <div id="search-btn" className="fas fa-search"></div>
            <div id="user-btn" className="fas fa-user"></div>
            {darkMode ? (
              <div
                id="toggle-btn"
                className="fas fa-sun"
                onClick={toggle}
              ></div>
            ) : (
              <div
                id="toggle-btn"
                className="fas fa-moon"
                onClick={toggle}
              ></div>
            )}
          </div>

          <div className="profile">
            <img src={image ? image : Img} alt="" />
            <span>Student</span>
            <Link to="/Profile" className="btn">
              View Profile
            </Link>
            <div className="flex-btn">
              <Link to="/Login" className="option-btn">
                Login
              </Link>
              <Link to="/Register" className="option-btn">
                Register
              </Link>
            </div>
            <Link
              to="/Logout"
              className="delete-btn"
              onClick="return confirm('logout from this website?');"
            >
              Logout
            </Link>
          </div>
        </section>
      </header>
    </>
  );
};

export default Header;
