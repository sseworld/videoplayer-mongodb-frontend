import React, { useEffect, useState } from "react";
import "../scss/teacher.css"
import "../../components/scss/error.css"
import Img from "../../assets/img/MQvWUfnqtwB5HkWX3LtO.jpg"
import { Link } from "react-router-dom";
import axios from "axios";
import Teachers from "../../components/jsx/Teachers";


const Teacher = () => {
  const [ err, setErr ] = useState(null);
  const [ dataMain, setData ] = useState(null);

  const getTeacher = () => {
    axios.get("http://127.0.0.1:3030/api/tutor/").then((response) => {
      const allTeachers = response.data;
      setData(allTeachers);
    }).catch(error => setErr(error.response.data));
  }

  useEffect(() => {
    getTeacher();
  }, []);

  return (
    <section className="teachers">
      <h1 className="heading">Expert Teacher</h1>
      <form action="" className="search-tutor">
        <input type="text" name="searchTutor" maxLength="100" placeholder="Search Tutor..." required />
        <button type="submit" name="searchTutorBtn" className="fas fa-search"></button>
      </form>
      <div className="box-container">

        {err ? 
          <p className="empty">{err}</p>
        : 
        dataMain?.map((teacher) => (        
            <Teachers key={teacher.id} id={teacher.id} name={teacher.name} img={Img} profession={teacher.profession} />
          ))
        }

      </div>
    </section>
  );
};

export default Teacher;
