import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import "../scss/profile.css";
import Img from "../../assets/pic-4.jpg";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const id = currentUser.id;
  const [ comments, setComments ] = useState(null);
  const [ likes, setLikes ] = useState(null);
  const [ bookmark, setBookmark ] = useState(null);

  const getBookmark = () => {
    axios
      .get("http://127.0.0.1:3030/api/home/bookmark?userId=" + id)
      .then((res) => {
        const totalBookmark = res.data;
        setBookmark(totalBookmark.length);
      });
  };

  const getComments = () => {
    axios
      .get("http://127.0.0.1:3030/api/home/comments?userId=" + id)
      .then((res) => {
        const totalComments = res.data;
        setComments(totalComments.length);
      });
  };

  const getLikes = () => {
    axios
      .get("http://127.0.0.1:3030/api/home/likes?userId=" + id)
      .then((res) => {
        const totalLikes = res.data;
        setLikes(totalLikes.length);
      });
  };

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

  useEffect(() => {
    getLikes();
    getBookmark();
    getComments();
  });

  if (data) {
    if (data.length) {
      var name = data[0].name;
      var image = data[0].image;
    }
  }

  return (
    <section className="profile">
      <h1 className="heading">Profile Details</h1>
      <div className="details">
        <div className="user">
          <img src={image ? image : Img} alt="" />
          <h3>{name}</h3>
          <p>Student</p>
          <Link to="/Profile/Update" className="inline-btn">
            Update Profile
          </Link>
        </div>
        <div className="box-container">
          <div className="box">
            <div className="flex">
              <i className="fas fa-bookmark"></i>
              <div>
                <h3>{bookmark}</h3>
                <span>Saved Playlist</span>
              </div>
            </div>
            <Link to="/Profile/Playlist" className="inline-btn" >Saved Playlist</Link>
          </div>
          <div className="box">
            <div className="flex">
              <i className="fas fa-bookmark"></i>
              <div>
                <h3>{likes}</h3>
                <span>Liked Video</span>
              </div>
            </div>
            <Link to="/Profile/Liked" className="inline-btn" >View Liked Video</Link>
          </div>
          <div className="box">
            <div className="flex">
              <i className="fas fa-bookmark"></i>
              <div>
                <h3>{comments}</h3>
                <span>View Comments</span>
              </div>
            </div>
            <Link to="/Profile/Comments" className="inline-btn" >View Comments</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
