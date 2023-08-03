import React from "react";
import "../../../pages/scss/courses.css";
import Playlist from "../Playlist";
import { useState } from "react";
import Img from "../../../assets/img/aZhOd42sUcJGAGgryKpb.png";
import { useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";

const TutorPlaylist = (props) => {
  const tutorId = props.tutor;
  const [dataMain, setData] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [err, setErr] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  
  const getPlaylist = async () => {
    try {
      setLoading1(true);
      await axios
        .get("http://127.0.0.1:3030/api/tutor/playlist/1?tutorId=" + tutorId)
        .then((res) => {
          const totalPlaylist = res.data;
          setData(totalPlaylist);
          setLoading1(false)
        });
    } catch (error) {
      setErr(error);
    }
  };

  const getTeacherDetail = async () => {
    setLoading2(true);
    await axios
      .get("http://127.0.0.1:3030/api/tutor/find?tutorId=" + tutorId)
      .then((response) => {
        const allTeachers = response.data;
        setTeacher(allTeachers);
        setLoading2(false)
      })
      .catch((error) => setErr(error.response.data));
    };
    
    useEffect(() => {
      getPlaylist();
      getTeacherDetail();
  }, []);

  if(loading1 || loading2) return <Loading err={"Loading the Playlist"} />;

  return (
    <>
        <section className="courses">
          <h1 className="heading">Latest Courses</h1>
          <div className="box-container">
            {dataMain?.map((playlist) => (
              <Playlist
                key={playlist.id}
                id={playlist.id}
                image={playlist.thumb}
                title={playlist.title}
                date={playlist.date}
                tutor={playlist.tutor_id}
                tname={teacher.name}
                timage={teacher.image}
              />
            ))}
          </div>
        </section>
    </>
  );
};

export default TutorPlaylist;
