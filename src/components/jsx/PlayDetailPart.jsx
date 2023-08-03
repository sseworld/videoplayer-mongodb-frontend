import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";

const PlayDetailPart = (props) => {
  const { currentUser } = useContext(AuthContext);
  const playId = props.pid;
  const [tutor, setTutor] = useState(null);
  const [video, setVideo] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const tid = props.ptid;

  const [inputs, setInputs] = useState({
    userId: currentUser.id,
    playId: playId,
  });

  const getTutorDetails = () => {
    setLoading2(true);
    try {
      axios
        .get("http://127.0.0.1:3030/api/play/p?tutorId=" + tid)
        .then((res) => {
          const details = res.data;
          setTutor(details);
          setLoading2(false);
        });
    } catch (err) {
      console.log(err);
      setLoading2(false);
    }
  };

  const getTotalVideos = () => {
    setLoading1(true);
    try {
      axios
        .get("http://127.0.0.1:3030/api/play/video/1?playId=" + playId)
        .then((res) => {
          const details = res.data;
          setVideo(details.length);
          setLoading1(false);
        });
    } catch (err) {
      console.log(err);
      setLoading1(false);
    }
  };

  const handleBookmark = async (e) => {
    try {
      await axios
        .get(
          `http://127.0.0.1:3030/api/play/mybookmark?userId=${currentUser.id}&&playId=${playId}`
        )
        .then((response) => {
          const bookData = response.data;
          if (bookData.length === 1) setBookmark(true);
          if (bookData.length === 0) setBookmark(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleBookmarkAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:3030/api/play/bookmark/add", inputs);
      setBookmark(true);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleBookmarkRemove = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:3030/api/play/bookmark/remove", inputs);
      setBookmark(false);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getTutorDetails();
  }, []);

  useState(() => {
    handleBookmark();
    getTotalVideos();
  });

  if (tutor) var tname = tutor[0].name;
  if (tutor) var tpr = tutor[0].profession;

  return (
    <>
      <div className="col">
        <div className="save-list">
          {bookmark ? (
            <button type="submit" onClick={handleBookmarkRemove} name="save_list">
              <i className="fas fa-bookmark"></i> <span>Saved</span>
            </button>
          ) : (
            <button type="submit" onClick={handleBookmarkAdd} name="save_list">
              <i className="far fa-bookmark"></i>
              <span>Save Playlist</span>
            </button>
          )}
        </div>
        <div className="thumb">
          <span>{video} Videos</span>
          <img src={props.pthumb} alt="Thumbnail" />
        </div>
      </div>
      <div className="col">
        <div className="tutor">
          <img src={props.img} alt="" />
          <div>
            <h3>{tutor ? tname : "Loading"}</h3>
            <h3>{tutor ? tpr : "Loading"}</h3>
          </div>
        </div>
        <div className="details">
          <h3>{props.pname}</h3>
          <p>{props.pdesc}</p>
          <div className="date">
            <i className="fas fa-calendar"></i>
            <span>{props.pdate}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayDetailPart;
