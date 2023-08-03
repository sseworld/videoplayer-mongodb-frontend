import React, { useContext, useEffect, useState } from "react";
import "../scss/sidebar.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import Img from "../../assets/pic-4.jpg"

const Sidebar = (props) => {
  const [err, setErr] = useState(null);
  const [data, setData] = useState(null)
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const script = document.createElement('script')
    script.src = "/src/assets/js/s.js"
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, [])

  const id = currentUser.id

  const getDetailsPro = async () => {
    try{
      await axios.get("http://localhost:3030/api/auth/login?id="+id).then((response) => {
        const details = response.data;
        setData(details);
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getDetailsPro()
  }, [])

  if(data){
    if(data.length){
      var name = data[0].name;
      var image = data[0].image
    }
  }

  return (
    <div className="sidebar">
      <div className="close-side-bar">
        <i className="fas fa-times"></i>
      </div>

      <div className="profile">
        <img src={image ? image : Img} alt="" />
        <h3>{name}</h3>
        <span>Student</span>
        <Link to="/Profile" className="btn" >View Profile</Link>
      </div>
      <nav className="navbar">
        <Link to="/Home" style={{ textDecoration: "none" }}>
          <i className="fas fa-home"></i> <span>Home</span>
        </Link>
        <Link to="/About" style={{ textDecoration: "none" }}>
          <i className="fas fa-question"></i> <span>About</span>
        </Link>
        <Link to="/Courses" style={{ textDecoration: "none" }}>
          <i className="fas fa-graduation-cap"></i> <span>Courses</span>
        </Link>
        <Link to="/Teacher" style={{ textDecoration: "none" }}>          
          <i className="fas fa-chalkboard-user"></i> <span>Teacher</span>
        </Link>
        <Link to="/Contact" style={{ textDecoration: "none" }}>          
          <i className="fas fa-headset"></i> <span>Contact Us</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
