import React, { useContext, useEffect, useState } from "react";
import CoursesPlaylist from "../../components/jsx/CoursesPlaylist";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { Link } from "react-router-dom";

const TotalPlaylist = () => {
  const { currentUser } = useContext(AuthContext);
  const id = currentUser.id;
  const [bookmark, setBookmark] = useState(null);

  const getBookmark = async () => {
    try {
      await axios
        .get("http://127.0.0.1:3030/api/home/bookmark?userId=" + id)
        .then((res) => {
          const bookmark = res.data;
          setBookmark(bookmark);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBookmark();
  }, []);

  return (
    <>
      <section className="courses">
        <h1 className="heading">Saved Playlist</h1>
        {/* <center><Link to="/Profile" className="inline-btn" >Go Back To Profile</Link></center> */}
        {/* <br /><br /> */}
        <div className="box-container">
          {bookmark && bookmark.length ? (
            bookmark?.map((play) => (
              <CoursesPlaylist key={play.playlist_id} id={play.playlist_id} />
            ))
          ) : (
            <p className="empty">No Courses Saved yet!</p>
          )}
        </div>
      </section>
    </>
  );
};

export default TotalPlaylist;
