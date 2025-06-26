function Navbar({headingText, buttonElementArray}) {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white shadow-md">
      <h1 className="text-2xl font-bold tracking-wide">{headingText}</h1>
      <div className='buttons flex gap-4'>
        {buttonElementArray}
      </div>
    </header>
  )
}

export default Navbar;
