import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Teachers = (props) => {
  const tutorId = props.id
  const [ playlist, setPlaylist ] = useState(null);
  const [ videos, setVideos ] = useState(null);
  const [ likes, setLikes ] = useState(null)
  const [ comments, setComments ] = useState(null);

  const getPlaylist = () => {
    axios.get("http://127.0.0.1:3030/api/tutor/playlist?tutorId="+tutorId).then((res) => {
      const totalPlaylist = res.data;
      setPlaylist(totalPlaylist.length);
    }).catch(error => console.log(error));
  }

  const getVideos = () => {
    axios.get("http://127.0.0.1:3030/api/tutor/videos?tutorId="+tutorId).then((res) => {
      const totalVideos = res.data;
      setVideos(totalVideos.length);
    }).catch(error => console.log(error));
  }

  const getLikes = () => {
    axios.get("http://127.0.0.1:3030/api/tutor/likes?tutorId="+tutorId).then((res) => {
      const totalLikes = res.data;
      setLikes(totalLikes.length);
    }).catch(error => console.log(error));
  }

  const getComments = () => {
    axios.get("http://127.0.0.1:3030/api/tutor/comments?tutorId="+tutorId).then((res) => {
      const totalComments = res.data;
      setComments(totalComments.length);
    }).catch(error => console.log(error));
  }


  useEffect(() => {
    getPlaylist();
    getVideos();
    getLikes();
    getComments();
  }, []);

  return (
    <div className="box">
      <div className="tutor">
        <img src={props.img} alt="Tutor Id" />
        <div>
          <h3>{props.name}</h3>
          <span>{props.profession}</span>
        </div>
      </div>
      <p>
        Playlists : <span>{playlist}</span>
      </p>
      <p>
        Total Videos : <span>{videos}</span>
      </p>
      <p>
        Total Likes : <span>{likes}</span>
      </p>
      <p>
        Total Comments : <span>{comments}</span>
      </p>
      <Link to={`/Teacher/${props.id}`}>
        <button className="inline-btn sse-btn">View Profile</button>
      </Link>
    </div>
  );
};

export default Teachers;
