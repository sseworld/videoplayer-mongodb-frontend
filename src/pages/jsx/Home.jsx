import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/authContext"
import "../scss/home.css";
import "../scss/courses.css";
import axios from 'axios';
import Loading from "../../components/jsx/Loading"
import MainPlaylist from '../../components/jsx/MainPlaylist';
import Error from "../../components/jsx/Error"

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser.id;

    const [ likes, setLikes ] = useState(null);
    const [ comments, setComments ] = useState(null);
    const [ playlist, setPlaylist ] = useState(null);
    const [ bookmark, setBookmark ] = useState(null);

    const [ loading, setLoading ] = useState(true)
    const [ loading3, setLoading3 ] = useState(false);
    const [ loading1, setLoading1 ] = useState(false);
    const [ loading2, setLoading2 ] = useState(false);
    const [ loading4, setLoading4 ] = useState(false);

    const getBookmark = () => {
        setLoading1(true)
        axios.get("http://127.0.0.1:3030/api/home/bookmark?userId="+userId).then((res) => {
            const totalBookmark = res.data;
            setBookmark(totalBookmark.length);
            setLoading1(false)
        })
    }

    const getComments = () => {
        setLoading2(true)
        axios.get("http://127.0.0.1:3030/api/home/comments?userId="+userId).then((res) => {
            const totalComments = res.data;
            setComments(totalComments.length);
            setLoading2(false)
        })
    }

    const getLikes = () => {
        setLoading3(true)
        axios.get("http://127.0.0.1:3030/api/home/likes?userId="+userId).then((res) => {
            const totalLikes = res.data;
            setLikes(totalLikes.length);
            setLoading3(false)
        })
    }

    const getPlaylist = () => {
        setLoading4(true)
        axios.get("http://127.0.0.1:3030/api/home/playlist").then((res) => {
            const totalLikes = res.data;
            setPlaylist(totalLikes);
            setLoading4(false)
        })
    }

    if(loading) {
        setTimeout(() => {
            setLoading(false);
        }, 500)
    }

    useEffect(() => {
        getPlaylist();
    }, []);
    
    useEffect(() => {
        getLikes();
        getBookmark();
        getComments();
    })

    if(loading4 || loading) return <Loading /> ;

    return (
        <>
            <section className="quick-select">
                <h1 className="heading">Quick Options</h1>
                <div className="box-container">
                    {currentUser.name ?
                        (
                            <div className="box">
                                <h3 className="title">Likes & Comments</h3>
                                <p>Total Likes: <span>{likes}</span></p>
                                <Link to="/Profile/" className="inline-btn">View Likes</Link>
                                <p>Total Comments: <span>{comments}</span></p>
                                <Link to="/Profile/" className="inline-btn">View Comments</Link>
                                <p>Total Bookmark: <span>{bookmark}</span></p>
                                <Link to="/Profile/" className="inline-btn">View Playlist</Link>
                            </div>
                        ) : (
                            <div className="box" style="text-align: center;">
                                <h3 className="title">Please Login</h3>
                                <div className="flex-btn" style="padding-top: .5rem;">
                                    <a href="/Login/" className="option-btn">Login</a>
                                    <a href="/Register/" className="option-btn">Register</a>
                                </div>
                            </div>
                        )
                    }
                    <div className="box">
                        <h3 className="title">Top Categories</h3>
                        <div className="flex">
                            <a href="#"><i className="fas fa-code"></i><span>development</span></a>
                            <a href="#"><i className="fas fa-chart-simple"></i><span>business</span></a>
                            <a href="#"><i className="fas fa-pen"></i><span>design</span></a>
                            <a href="#"><i className="fas fa-chart-line"></i><span>marketing</span></a>
                            <a href="#"><i className="fas fa-music"></i><span>music</span></a>
                            <a href="#"><i className="fas fa-camera"></i><span>photography</span></a>
                            <a href="#"><i className="fas fa-cog"></i><span>software</span></a>
                            <a href="#"><i className="fas fa-vial"></i><span>science</span></a>
                        </div>
                    </div>

                    <div className="box">
                        <h3 className="title">popular topics</h3>
                        <div className="flex">
                        <a href="#"><i className="fab fa-html5"></i><span>HTML</span></a>
                        <a href="#"><i className="fab fa-css3"></i><span>CSS</span></a>
                        <a href="#"><i className="fab fa-js"></i><span>Javascript</span></a>
                        <a href="#"><i className="fab fa-react"></i><span>React</span></a>
                        <a href="#"><i className="fab fa-php"></i><span>PHP</span></a>
                        <a href="#"><i className="fab fa-bootstrap"></i><span>Bootstrap</span></a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="courses">
                <h1 className="heading">Latest Courses</h1>
                <div className="box-container">
                    {playlist.length ? 
                        (playlist?.map((play) => (
                        <MainPlaylist
                            key={play.id}
                            date={play.date}
                            desc={play.description}
                            thumb={play.thumb}
                            title={play.title}
                            id={play.id}
                            tid={play.tutor_id}
                        />
                    ))): (<Error title="No Courses Added Yet" />)}
                </div>
                <div className="more-btn">
                    <Link to="/Courses" className="inline-option-btn" >View More</Link>
                </div>
            </section>
        </>
    )
}

export default Home
