import React, { useEffect, useState } from "react";
import Img from "../../assets/img/MQvWUfnqtwB5HkWX3LtO.jpg";
import "../scss/courses.css";
import Playlist from "../../components/jsx/Playlist";
import { playlist } from "../../context/constant";
import Loading from "../../components/jsx/Loading";
import axios from "axios";
import Error from "../../components/jsx/Error";
import MainPlaylist from "../../components/jsx/MainPlaylist";

const Courses = () => {
  const [playlist, setPlaylist] = useState(null);
  const [ loading, setLoading ] = useState(true)
  const [loading4, setLoading4] = useState(false);

  const getPlaylist = () => {
    setLoading4(true);
    axios.get("http://127.0.0.1:3030/api/home/playlist/1").then((res) => {
      const totalLikes = res.data;
      setPlaylist(totalLikes);
      setLoading4(false);
    });
  };

  if(loading) {
    setTimeout(() => {
        setLoading(false);
    }, 500)
  }

  useEffect(() => {
    getPlaylist();
  }, []);

  if (loading4) return <Loading />;

  return (
    <>
      <section className="courses">
        <h1 className="heading">All Courses</h1>
        <div className="box-container">
          {playlist?.map((play) => (
              <MainPlaylist
                key={play.id}
                date={play.date}
                desc={play.description}
                thumb={play.thumb}
                title={play.title}
                id={play.id}
                tid={play.tutor_id}
              />
            ))}
        </div>
      </section>
    </>
  );
};

export default Courses;
