import React from "react";
import aboutImg from "../../assets/about-img.svg";
import { Link } from "react-router-dom";
import '../scss/about.css'
import "../../scss/buttons.css";

const About = () => {
  return (
    <section className="about">
      <div className="row">
        <div className="image">
          <img src={aboutImg} alt="About" />
        </div>
        <div className="content">
          <h3>Why choose us?</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque nobis
            distinctio, nisi consequatur ad sequi, rem odit fugiat assumenda
            eligendi iure aut sunt ratione, tempore porro expedita quisquam.
          </p>
          <Link to="/Courses" style={{ textDecoration: "none" }} className="inline-btn">Our Courses</Link>
        </div>
      </div>
      <div className="box-container">
        <div className="box">
          <i className="fas fa-graduation-cap"></i>
          <div>
            <h3>+1K</h3>
            <span>Online Courses</span>
          </div>
        </div>
        <div className="box">
          <i className="fas fa-user-graduate"></i>
          <div>
            <h3>+25K</h3>
            <span>Brillients Students</span>
          </div>
        </div>
        <div className="box">
          <i className="fas fa-chalkboard-user"></i>
          <div>
            <h3>+5K</h3>
            <span>Expert Teachers</span>
          </div>
        </div>
        <div className="box">
          <i className="fas fa-briefcase"></i>
          <div>
            <h3>100%</h3>
            <span>Job Placement</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
