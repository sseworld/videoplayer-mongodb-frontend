import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Img from "../../assets/pic-3.jpg";
import TutorProfile from "../../components/jsx/tutor/TutorProfile";
import TutorPlaylist from "../../components/jsx/tutor/TutorPlaylist";
import Loading from "../../components/jsx/Loading";

const ViewTeachers = () => {
  const param = useParams();
  const tutorId = param.id;
  const [err, setErr] = useState(null);
  const [dataMain, setData] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [videos, setVideos] = useState(null);
  const [likes, setLikes] = useState(null);
  const [comments, setComments] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);

  const getTeacherDetail = () => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:3030/api/tutor/find?tutorId=" + tutorId)
      .then((response) => {
        const allTeachers = response.data;
        setData(allTeachers);
        setLoading(false);
      })
      .catch((error) => setErr(error.response.data));
  };

  const getPlaylist = () => {
    setLoading1(true);
    axios
      .get("http://127.0.0.1:3030/api/tutor/playlist?tutorId=" + tutorId)
      .then((res) => {
        const totalPlaylist = res.data;
        setPlaylist(totalPlaylist.length);
        setLoading1(false);
      })
      .catch((error) => console.log(error));
  };

  const getVideos = () => {
    setLoading2(true);
    axios
      .get("http://127.0.0.1:3030/api/tutor/videos?tutorId=" + tutorId)
      .then((res) => {
        const totalVideos = res.data;
        setVideos(totalVideos.length);
        setLoading2(false);
      })
      .catch((error) => console.log(error));
  };

  const getLikes = () => {
    setLoading3(true);
    axios
      .get("http://127.0.0.1:3030/api/tutor/likes?tutorId=" + tutorId)
      .then((res) => {
        const totalLikes = res.data;
        setLikes(totalLikes.length);
        setLoading3(false);
      })
      .catch((error) => console.log(error));
  };

  const getComments = () => {
    setLoading4(true);
    axios
      .get("http://127.0.0.1:3030/api/tutor/comments?tutorId=" + tutorId)
      .then((res) => {
        const totalComments = res.data;
        setComments(totalComments.length);
        setLoading4(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTeacherDetail();
    getPlaylist();
    getVideos();
    getLikes();
    getComments();
  }, []);
  console.log(dataMain)

  if (loading || loading1 || loading2 || loading3 || loading4)
    <Loading err={"Loading The Details"} />;

  return (
    <>
      {dataMain?.map((details) => (
        <TutorProfile
          key={details.id}
          profileName={details.name}
          prof={details.profession}
          tplaylist={playlist}
          tvideos={videos}
          tLikes={likes}
          comment={comments}
          img={Img}
        />
      ))}
      <TutorPlaylist tutor={tutorId} />
    </>
  );
};

export default ViewTeachers;
