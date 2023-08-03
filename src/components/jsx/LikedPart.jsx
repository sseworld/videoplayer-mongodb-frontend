import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LikedPart = (props) => {
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(null)
  const detailsId = props.id;
  // console.log(detailsId)

  const getDetails = async () => {
    setLoading(true)
    try {
      await axios.get("http://127.0.0.1:3030/api/profile/Likes/Details?id="+detailsId).then((res) => {
        const total = res.data;
        setDetails(total[0])
        setLoading(false)
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getDetails();
  }, [])

  console.log(details)

  if(!loading){
    if(details){
      var thumb = details.thumb;
    }
  }

  return (
    <>
      <div className="box">
        <div className="tutor">
          <img src={thumb} alt="" />
        </div>
      </div>
    </>
  );
};

export default LikedPart;
