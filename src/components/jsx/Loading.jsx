import React from 'react'
import "../scss/loading.css"

const Loading = (props) => {
  return (
    <div className="loading">
      <div className="lds-hourglass"></div>
      {/* {props.err} */}
    </div>
  )
}

export default Loading
