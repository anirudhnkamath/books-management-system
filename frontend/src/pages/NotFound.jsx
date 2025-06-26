import React from 'react'

function NotFound() {
  return (
    <>
      <header className="flex justify-between items-center px-6 py-5 bg-blue-600 text-white shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">404 Error</h1>
      </header>
      <div className="text-xl font-medium text-center text-gray-600 mt-8">
        Page not found
      </div>
    </>
  )
}

export default NotFound
