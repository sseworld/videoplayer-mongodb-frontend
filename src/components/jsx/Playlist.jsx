import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Playlist = (props) => {
  return (
    <div className="box">
      <div className="tutor">
        {!props.timage ? (
          <h6>Image</h6>
          ):(
          <img src={props.timage} alt="" />
        )}
        <div>
          <h3>{props.tname}</h3>
          <span>{props.date}</span>
        </div>
      </div>
      <img src={props.image} alt="" className="thumb" />
      <h3 className="title">{props.title}</h3>
      <Link to={`/Courses/${props.id}`} className="inline-btn sse-btn">
        View Playlist
      </Link>
    </div>
  );
};

export default Playlist;
