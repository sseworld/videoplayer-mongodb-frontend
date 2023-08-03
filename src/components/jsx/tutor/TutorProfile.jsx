import React from 'react'
import "../../scss/tutorprofile.css"

const TutorProfile = (props) => {
  return (
    <section className="tutor-profile">
        <h1 className="heading">Profile Details</h1>
        <div className="details">
          <div className="tutor">
            <img src={props.img} alt="Profile Image" />
            <h3>{props.profileName}</h3>
            <span>{props.prof}</span>
          </div>
          <div className="flex">
            <p>Playlists : <span>{props.tplaylist}</span></p>
            <p>Total Videos : <span>{props.tvideos}</span></p>
            <p>Total Likes : <span>{props.tLikes}</span></p>
            <p>Total Comments : <span>{props.comment}</span></p>
          </div>
        </div>
      </section>
  )
}

export default TutorProfile
