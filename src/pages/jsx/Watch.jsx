import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WatchPart from "../../components/jsx/WatchPart";
import axios from "axios";
import Loading from "../../components/jsx/Loading";
import WatchComments from "../../components/jsx/WatchComments";
import EditComment from "../../components/jsx/EditComment";

const Watch = () => {
  const id = useParams();
  const watchId = id.id;
  const [video, setVideo] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [commentBox, setCommentBox] = useState(false);
  const [commentId, setCommentId] = useState(null);

  const getVideo = async () => {
    setLoading1(true);
    try {
      await axios
        .get("http://127.0.0.1:3030/api/watch/watch?videoId=" + watchId)
        .then((response) => {
          const videos = response.data;
          setVideo(videos);
          setLoading1(false);
        });
    } catch (err) {
      console.log(err);
      setLoading1(false);
    }
  };

  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }

  useEffect(() => {
    getVideo();
  }, []);

  if (loading || loading1) return <Loading err={"Loading The Data"} />;

  return (
    <>
      {video ? (
        video.length ? (
          <>
            {commentBox && <EditComment setCommentBox={setCommentBox} commId={commentId} />}
            <WatchPart
              id={video[0].id}
              tutorId={video[0].tutor_id}
              playlistId={video[0].playlist_id}
              thumb={video[0].thumb}
              video={video[0].video}
              date={video[0].date}
              description={video[0].description}
              title={video[0].title}
            />
            <WatchComments
              id={video[0].id}
              setCommentBox={setCommentBox}
              setCommentId={setCommentId}
              tutorId={video[0].tutor_id}
            />
          </>
        ) : (
          <>
            <br />
            <p class="empty">No Videos Added yet!</p>
          </>
        )
      ) : (
        <>
          <br />
          <p class="empty">Loading The Data</p>
        </>
      )}
    </>
  );
};

export default Watch;
