'use client'

import React from 'react'
import './AnimatedRobot.css'

const AnimatedRobot = () => {
  return (
    <div className="robot-container">
      {/* Robot body using simple SVG-like structure */}
      <div className="robot">
        {/* Head */}
        <div className="robot__head">
          <div className="robot__face">
            {/* Left eye */}
            <div className="robot__eye robot__eye--left">
              <div className="robot__pupil"></div>
            </div>
            {/* Right eye */}
            <div className="robot__eye robot__eye--right">
              <div className="robot__pupil"></div>
            </div>
            {/* Mouth smile */}
            <div className="robot__mouth"></div>
          </div>
        </div>

        {/* Antenna */}
        <div className="robot__antenna"></div>

        {/* Body */}
        <div className="robot__body">
          {/* Chest plate */}
          <div className="robot__chest"></div>
          {/* Torso lines */}
          <div className="robot__torso-line robot__torso-line--1"></div>
          <div className="robot__torso-line robot__torso-line--2"></div>
        </div>

        {/* Left arm */}
        <div className="robot__arm robot__arm--left">
          <div className="robot__forearm"></div>
          <div className="robot__hand"></div>
        </div>

        {/* Right arm (waves) */}
        <div className="robot__arm robot__arm--right">
          <div className="robot__forearm"></div>
          <div className="robot__hand robot__hand--waving"></div>
        </div>

        {/* Legs */}
        <div className="robot__legs">
          <div className="robot__leg robot__leg--left"></div>
          <div className="robot__leg robot__leg--right"></div>
        </div>
      </div>

      {/* Glow effect */}
      <div className="robot__glow"></div>
    </div>
  )
}

export default AnimatedRobot
