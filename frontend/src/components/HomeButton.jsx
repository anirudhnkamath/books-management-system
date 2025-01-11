import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeButton() {
  return (
    <Link to="/">
      <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-transform transform hover:scale-105">
        Back to Home
      </button>
    </Link>
  )
}
