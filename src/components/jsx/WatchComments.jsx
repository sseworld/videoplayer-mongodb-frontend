import React, { useContext, useEffect, useState } from "react";
import "../scss/watchcomment.css";
import Commments from "./Commments";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const WatchComments = (props) => {
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.id;
  const tid = props.tutorId;
  const pid = props.id;

  const [comments, setComments] = useState(null);
  const [err, setErr] = useState(null);

  const [inputs, setInputs] = useState({
    contentId: pid,
    userId: uid,
    tutorId: tid,
    commentBox: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:3030/api/watch/comments/add", inputs);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const getComments = async () => {
    try {
      await axios
        .get("http://127.0.0.1:3030/api/watch/comments?videoId=" + pid)
        .then((response) => {
          const totalComments = response.data;
          setComments(totalComments);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getComments();
  });

  if (comments) var len = comments.length;

  return (
    <>
      <section className="comments">
        <div className="quick-select">
          <div className="box-container">
            <div className="box">
              <h1 className="heading">Playlist Related Videos</h1>
            </div>
            <div className="box">
              <h1 className="heading">Add a Comment</h1>
              <form className="add-comment">
                <textarea
                  onChange={handleChange}
                  name="commentBox"
                  required
                  placeholder="write your comment..."
                  maxLength="1000"
                  cols="30"
                  rows="10"
                ></textarea>
                <p className="center" style={{ color: "red" }}>
                  {err && err}
                </p>
                <input
                  type="submit"
                  onClick={handleClick}
                  value="Add Comment"
                  className="inline-btn"
                />
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="comments">
        <h1 className="heading">User Comments</h1>
        <div className="show-comments">
          {len ? (
            comments?.map((comment) => (
              <Commments
                key={comment.id}
                id={comment.id}
                uid={comment.user_id}
                comBox={props.setCommentBox}
                comId={props.setCommentId}
                date={comment.date}
                data={comment.comment}
              />
            ))
          ) : (
            <p className="empty">No Comments added yet!</p>
          )}
          ;
        </div>
      </section>
    </>
  );
};

export default WatchComments;
