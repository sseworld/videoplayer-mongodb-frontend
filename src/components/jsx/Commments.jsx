import React, { useContext, useEffect, useState } from "react";
import Img from "../../assets/pic-4.jpg";
import axios from "axios";
import Loading from "./Loading";
import { AuthContext } from "../../context/authContext";

const Commments = (props) => {
  const userId = props.uid;
  const cis = props.id;
  const [userDetails, setUserDetails] = useState(null);
  const [comm, setComm] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const actId = currentUser.id;

  const handleEdit = () => {
    props.comBox(true);
    props.comId(cis);
  };

  const handleDelete = async () => {
    try {
      await axios
        .delete(
          "http://127.0.0.1:3030/api/watch/comments/delete?commentId=" + cis
        )
        .then((response) => {
          setComm("Deleted Successfully");
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getUserDetails = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          "http://127.0.0.1:3030/api/watch/comments/details?userId=" + userId
        )
        .then((response) => {
          const userDet = response.data;
          setUserDetails(userDet);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  if (userDetails) {
    if (userDetails.length) {
      var name = userDetails[0].name;
      var img = userDetails[0].image;
    }
  }

  return (
    <div /* style={userId === actId && ("order: -1")} */ className={`box ${userId === actId ? "order-1" : "order"}`}>
      <div className="user">
        <img src={img ? img : Img} alt="" />
        <div>
          <h3>{!loading ? name : <h3>Loading</h3>}</h3>
          <span>{props.date}</span>
        </div>
      </div>
      <p className="text">{props.data}</p>
      {userId === actId && (
        <div className="flex-btn">
          <input type="hidden" name="comment_id" value={props.id} />
          <button
            type="submit"
            name="edit_comment"
            className="inline-option-btn"
            onClick={handleEdit}
          >
            Edit comment
          </button>
          <button
            type="submit"
            name="delete_comment"
            className="inline-delete-btn"
            onClick={handleDelete}
          >
            Delete Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default Commments;
