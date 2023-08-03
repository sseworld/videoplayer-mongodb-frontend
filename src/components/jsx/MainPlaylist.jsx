import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Img from "../../assets/pic-4.jpg";

const MainPlaylist = (props) => {
  const tutorid = props.tid;
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(false);

  const tGetTutor = async () => {
    try {
      setLoading(true);
      await axios
        .get("http://127.0.0.1:3030/api/home/tutor?tutorId=" + tutorid)
        .then((res) => {
          const grtTut = res.data;
          setTutor(grtTut);
        });
    } catch (err) {
      console.log(err);
    }
  };

  if (tutor) {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  if (tutor) {
    if (tutor.length) {
      var name = tutor[0].name;
      var image = tutor[0].image;
    }
  }

  useEffect(() => {
    tGetTutor();
  },[]);

  return (
    <div className="box">
      <div className="tutor">
        <img src={!image ? Img : "image"} alt="Profile Image" />
        <div>
          <h3>{!tutor ? "Loading" : (name)}</h3>
          <span>{props.date}</span>
        </div>
      </div>
      <img src={props.thumb} alt="Thumbnail" className="thumb" />
      <h3 className="title">{props.title}</h3>
      <Link to={`/Courses/${props.id}`} className="inline-btn">
        View Playlist
      </Link>
    </div>
  );
};

export default MainPlaylist;
