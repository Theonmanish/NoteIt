import React from 'react'
import { CiLight } from "react-icons/ci";


const Navbar = ({ isDark, setIsDark }) => {
  return (
    <nav>
        <div className="logo">
          <img src="logo2.png" alt="logo" />
          NoteIt
          </div>
        <button className='icon'   onClick={() => setIsDark(!isDark)} style={{margin: '10px', padding: '8px 16px', fontSize: '20px'}}>
        <CiLight />
      </button>
    </nav>
  )
}

export default Navbar