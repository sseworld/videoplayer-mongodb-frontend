import React from 'react'
import '../scss/footer.css'

const Footer = () => {
  return (
    <footer className="footer">
        &copy; Copyright @{new Date().getFullYear()} by <span>SSE World</span> | All Rights Reserved !
    </footer>
  )
}

export default Footer
