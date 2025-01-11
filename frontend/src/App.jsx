import React from 'react'
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import CreateBook from "./pages/CreateBook.jsx"
import DeleteBook from "./pages/DeleteBook.jsx"
import EditBook from "./pages/EditBook.jsx"
import ShowBook from "./pages/ShowBook.jsx"
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/books/create" element={<CreateBook />}/>
      <Route path="/books/details/:id" element={<ShowBook />}/>
      <Route path="/books/edit/:id" element={<EditBook />}/>
      <Route path="/books/delete/:id" element={<DeleteBook />}/>
      <Route path="/users/login/" element={<Login />}/>
      <Route path="/users/register/" element={<Register />}/>
    </Routes>
  )
}

export default App