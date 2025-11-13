'use client'

import React from 'react'
import './Skeleton.css'

export default function SkeletonSection() {
  return (
    <div className="skeleton-section" aria-hidden="true">
      <div className="skeleton-content">
        <div className="skeleton-line short" />
        <div className="skeleton-line medium" />
        <div className="skeleton-line long" />
      </div>
    </div>
  )
}
