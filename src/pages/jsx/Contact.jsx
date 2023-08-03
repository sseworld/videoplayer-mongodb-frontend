import React, { useContext, useState } from 'react';
import Img from "../../assets/contact-img.svg";
import "../../scss/buttons.css"
import "../scss/contact.css"
import axios from 'axios';
import { AuthContext } from "../../context/authContext";
import { Navigate } from 'react-router-dom';

const Contact = () => {
  const [ err, setErr ] = useState(null);
  const { currentUser } = useContext(AuthContext)

  const [ inputs, setInputs ] = useState({
    name: currentUser.name,
    email: currentUser.email,
    number: "",
    msg: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try{
      if(!inputs.number){
        setErr("Number Can't Be Empty")
      }else if(!inputs.msg){
        setErr("Message Can't Be Empty")
      }else{
        await axios.post("http://127.0.0.1:3030/api/contact/", inputs);
        Navigate("/Contact")
        setErr(null)
      }
    } catch (err) {
      setErr(err.response.data);
    }
  }

  return (
    <section className="contact">
      <div className="row">
        <div className="image">
            <img src={Img} alt="Contact Image" />
        </div>
        <form>
            <h3>Get in Touch</h3>
            <input type="text" onChange={handleChange} value={currentUser.name} placeholder="enter your name" required maxLength="100" name="name" className="box" />
            <input type="email" onChange={handleChange} value={currentUser.email} placeholder="enter your email" required maxLength="100" name="email" className="box" />
            <input type="number" onChange={handleChange} min="0" max="9999999999" placeholder="enter your number" required maxLength="10" name="number" className="box" />
            <textarea name="msg" onChange={handleChange} className="box" placeholder="enter your message" required cols="30" rows="10" maxLength="1000"></textarea>
            <p>{err && err}</p>
            <input type="submit" onClick={handleClick} value="send message" className="inline-btn sse-btn" name="submit"/>
        </form>
      </div>
      <div className="box-container">
        <div className="box">
            <i className="fas fa-phone"></i>
            <h3>Phone Number</h3>
            <a href="tel:8930309779">+91 8930309779</a>
            <a href="tel:9416853879">+91 9416853879</a>
        </div>
        <div className="box">
            <i className="fas fa-envelope"></i>
            <h3>Email Address</h3>
            <a href="mailto:shaikhanas@gmail.com">shaikhanas@gmail.come</a>
            <a href="mailto:anasbhai@gmail.com">anasbhai@gmail.come</a>
        </div>
        <div className="box">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Office Address</h3>
            <a href="#">flat no. 1, a-1 building, jogeshwari, mumbai, india - 400104</a>
        </div>
      </div>
    </section>
  )
}

export default Contact
