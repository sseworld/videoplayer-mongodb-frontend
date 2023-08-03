import React, { useContext, useEffect } from "react";
import Img from "../../assets/pic-4.jpg";
import "../scss/watchpart.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { AuthContext } from "../../context/authContext";

const WatchPart = (props) => {
  const { currentUser } = useContext(AuthContext);
  const id = props.id;
  const tid = props.tutorId;
  const [likes, setLikes] = useState(false);
  const [likesC, setLikesC] = useState(null);
  const [likesData, setLikesData] = useState(null);
  const [tutor, setTutor] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [inputs, setInputs] = useState({
    userId: currentUser.id,
    tutorId: tid,
    videoId: id,
  });

  const getLikes = async () => {
    setLoading(true);
    try {
      await axios
        .get("http://127.0.0.1:3030/api/watch/likes?videoId=" + id)
        .then((response) => {
          const totalLikes = response.data;
          setLikesData(totalLikes.length);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getTutors = async () => {
    setLoading1(true);
    try {
      await axios
        .get("http://127.0.0.1:3030/api/watch/tutors?tutorId=" + tid)
        .then((response) => {
          const tutorDetails = response.data;
          setTutor(tutorDetails);
          setLoading1(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTutors();
  }, []);

  useEffect(() => {
    getLikes();
    handleLikes();
  });

  const handleLikes = async () => {
    try {
      await axios
        .get(
          `http://127.0.0.1:3030/api/watch/mylikes?userId=${currentUser.id}&&videoId=${id}`
        )
        .then((response) => {
          const likesData1 = response.data;
          if (likesData1.length === 1) setLikes(true);
          if (likesData1.length === 0) setLikes(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleLikesAdd = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://127.0.0.1:3030/api/watch/mylikes/add", inputs);
      setLikes(true);
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const handleLikesRemove = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://127.0.0.1:3030/api/watch/mylikes/remove", inputs);
      setLikes(false);
    } catch (err) {
      console.log(err.response.data)
    }
  }

  if (tutor) var name = tutor[0].name;
  if (tutor) var prof = tutor[0].profession;

  return (
    <section className="watch-video">
      <div className="video-details">
        <video
          src={props.video}
          className="video"
          poster={props.thumb}
          controls
        ></video>
        <h3 className="title">{props.title}</h3>
        <div className="info">
          <p>
            <i className="fas fa-calendar"></i>
            <span>{props.date}</span>
          </p>
          <p>
            <i className="fas fa-heart"></i>
            <span>{likesData} Likes</span>
          </p>
        </div>
        <div className="tutor">
          <img src={Img} alt="Tutor Image" />
          <div>
            {loading1 ? <h3>Loading</h3> : <h3>{name}</h3>}
            {loading1 ? <h3>Loading</h3> : <span>{prof}</span>}
          </div>
        </div>
        <div className="flex">
          <input type="hidden" name="content_id" />
          <Link to={`/Courses/${props.playlistId}`} className="inline-btn">
            View Playlist
          </Link>
          {likes ? (
            <button type="submit" onClick={handleLikesRemove} name="like_content">
              <i className="fas fa-heart"></i> <span>Liked</span>
            </button>
          ) : (
            <button type="submit" onClick={handleLikesAdd} name="like_content">
              <i className="far fa-heart"></i> <span>Like</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default WatchPart;
