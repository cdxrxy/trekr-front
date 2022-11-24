import React from 'react'
import './loader.scss'

const Loader = () => {
  return (
    <div className="flex justify-center items-center loader-container">
      <div class="container">
        <div class="📦"></div>
        <div class="📦"></div>
        <div class="📦"></div>
        <div class="📦"></div>
        <div class="📦"></div>
      </div>
      <h1 className="loader-container-text">TREKR</h1>
    </div>
  )
}

export default Loader
