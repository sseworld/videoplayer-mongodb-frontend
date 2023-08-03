import React from "react";
import { Link } from "react-router-dom";
import Img from "../../assets/img/evuBHAZiF80h01nk6EWb.jpg";

const Videos = (props) => {
  const id = props.id;
  const thumb = props.thumb;
  const title = props.title;

  return (
    <Link to={`/watch/${id}`} className="box">
      <i className="fas fa-play"></i>
      <img src={thumb} alt="" />
      <h3>{title}</h3>
    </Link>
  );
};

export default Videos;
