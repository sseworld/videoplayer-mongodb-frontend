import axios from "axios";
import React, { useEffect, useState } from "react";
import MainPlaylist from "./MainPlaylist";

const CoursesPlaylist = (props) => {
  const id = props.id;
  const [courses, setCourses] = useState(null);

  const getCourseDetails = async () => {
    try {
      await axios
        .get("http://127.0.0.1:3030/api/play/bookmark/courses?playId=" + id)
        .then((res) => {
          const details = res.data;
          setCourses(details);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCourseDetails();
  }, []);

  if (courses) {
    if (courses.length) {
      var title = courses[0].title;
      var desc = courses[0].description;
      var tid = courses[0].tutor_id;
      var thumb = courses[0].thumb;
      var date = courses[0].date;
      var idMain = courses[0].id
    }
  }

  console.log(courses);

  return (
    <MainPlaylist
      date={date}
      desc={desc}
      thumb={thumb}
      title={title}
      id={idMain}
      tid={tid}
    />
  );
};

export default CoursesPlaylist;
