import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import HomeButton from '../components/HomeButton';

function CreateBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if(!token){
      navigate("/users/login");
    }
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    const book = { title, author, year: parseInt(year) };
    setLoading(true);

    const token = localStorage.getItem("Token");
    if(!token){
      console.log("No TOken")
      setLoading(false);
      navigate("/");
    }

    axios
      .post('http://localhost:3001/books/',book, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <section className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center px-6 py-5 bg-blue-600 text-white shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">Add Book</h1>
      </header>
      <div className="content px-6 py-8 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 space-y-4"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="author"
              className="block text-gray-700 font-medium mb-2"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="year"
              className="block text-gray-700 font-medium mb-2"
            >
              Year
            </label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-medium rounded-lg transition-all ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            }`}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Book'}
          </button>
        </form>
      </div>
      <div className='grid place-content-center'>
        <HomeButton />
      </div>
    </section>
  );
}

export default CreateBook;
