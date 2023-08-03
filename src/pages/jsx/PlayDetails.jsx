import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Loading from "../../components/jsx/Loading";
import Error from "../../components/jsx/Error";
import "../scss/playdetails.css";
import "../scss/video.css";
import Img from "../../assets/img/evuBHAZiF80h01nk6EWb.jpg";
import PlayDetailPart from "../../components/jsx/PlayDetailPart";
import Videos from "../../components/jsx/Videos";

const PlayDetails = () => {
  const param = useParams();
  const playId = param.id;
  const [playlist, setPlaylist] = useState(null);
  const [videos, setVideos] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const getPlaylistDetails = async () => {
    setLoading1(true);
    try {
      await axios
        .get("http://127.0.0.1:3030/api/play/?playId=" + playId)
        .then((res) => {
          const details = res.data;
          setPlaylist(details);
          setLoading1(false);
        });
    } catch (err) {
      console.log(err);
      setLoading1(false);
    }
  };

  const getPlayVideosDetails = async () => {
    setLoading2(true);
    try {
      await axios
        .get("http://127.0.0.1:3030/api/play/video/2?playId=" + playId)
        .then((res) => {
          const details = res.data;
          setVideos(details);
          setLoading2(false);
        });
    } catch (err) {
      console.log(err);
      setLoading2(false);
    }
  };

  useEffect(() => {
    getPlaylistDetails();
    getPlayVideosDetails();
  }, []);
  console.log(videos)

  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  if (playlist) var pid = playlist[0].id;
  if (playlist) var tid = playlist[0].tutor_id;
  if (playlist) var ptitle = playlist[0].title;
  if (playlist) var dpes = playlist[0].description;
  if (playlist) var dde = playlist[0].date;
  if (playlist) var dtum = playlist[0].thumb;

  if (loading || loading1 || loading2) return <Loading />;

  return (
    <>
      <section className="playlist">
        <h1 className="heading">Playlist Details</h1>
        <div className="row">
          {playlist.length ? (
            <PlayDetailPart
              pid={pid}
              img={Img}
              ptid={tid}
              pname={ptitle}
              pdesc={dpes}
              pdate={dde}
              pthumb={dtum}
            />
          ) : (
            <Error title="Playlist was not found!" />
          )}
        </div>
      </section>
      <section className="videos-container">
        <h1 className="heading">Playlist Videos</h1>
        <div className="box-container">
          {videos.length ? (
            videos?.map((video) => (
              <Videos
                key={video.id}
                id={video.id}
                thumb={video.thumb}
                title={video.title}
              />
            ))
          ) : (
            <p className="empty">No Videos added yet!</p>
          )}
        </div>
      </section>
    </>
  );
};

export default PlayDetails;
