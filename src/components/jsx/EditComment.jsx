import React, { useEffect, useState } from "react";
import "../scss/editcomment.css";
import axios from "axios";

const EditComment = (props) => {
  const id = props.commId;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [inputs, setInputs] = useState({ commentId: id, commentValue: "" });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const cancelEdit = () => {
    props.setCommentBox(false);
  };

  const getData = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          "http://127.0.0.1:3030/api/watch/comments/detail/1?commentId=" + id
        )
        .then((response) => {
          const commDetails = response.data;
          setData(commDetails);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://127.0.0.1:3030/api/watch/comments/update",
        inputs
      );
      props.setCommentBox(false);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (data) {
    if (data.length) {
      var da = data[0].comment;
      var dai = data[0].id;
    }
  }

  return (
    <section className="edit-comment">
      <h1 className="heading">Edit Comment</h1>
      <form>
        <textarea
          name="commentValue"
          className="box"
          maxLength="1000"
          required
          placeholder="Please Enter Your Comment"
          cols="30"
          rows="10"
          onChange={handleChange}
        >
          {da}
        </textarea>
        <p className="center" style={{ color: "red", fontSize: "18px" }}>
          {err && err}
        </p>
        <div className="flex">
          <input
            type="submit"
            value="Cancel Edit"
            onClick={cancelEdit}
            className="inline-option-btn"
          />
          <input
            type="submit"
            value="update now"
            name="update_now"
            onClick={updateData}
            className="inline-btn"
          />
        </div>
      </form>
    </section>
  );
};

export default EditComment;
