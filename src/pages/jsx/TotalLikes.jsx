import React, { useContext, useEffect, useState } from "react";
import LikedPart from "../../components/jsx/LikedPart";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const TotalLikes = () => {
  const { currentUser } = useContext(AuthContext);
  const id = currentUser.id;
  const [likes, setLikes] = useState(null);

  const getLikes = async () => {
    try {
      await axios
        .get("http://127.0.0.1:3030/api/profile/Likes?userId=" + id)
        .then((res) => {
          const total = res.data;
          setLikes(total);
        });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(likes);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <section className="courses">
      <h1 className="heading">Liked Videos</h1>
      <div className="box-conatiner">
        {likes && likes.length ? (
          likes?.map((like) => (
            <LikedPart key={like.content_id} id={like.content_id} />
          ))
        ) : (
          <p className="empty">No Video Liked yet!</p>
        )}
      </div>
    </section>
  );
};

export default TotalLikes;
