import React from 'react'

const Alert = ({ props }) => {
  return (
    <>
    {props.alert4 && <div className="message">
        <span> {props.alert4} </span>
        <i className="fas fa-times" onClick="this.parentElement.remove();"></i>
    </div>}
    </>
  )
}

export default Alert
