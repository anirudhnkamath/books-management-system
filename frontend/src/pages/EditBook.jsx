import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import HomeButton from '../components/HomeButton';

function EditBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to store error messages
  const navigate = useNavigate();
  const params = useParams();

  // Get token from localStorage or other secure place
  const token = localStorage.getItem('Token');  // Assuming token is stored in localStorage

  const handleSubmit = (e) => {
    e.preventDefault();
    const book = { title, author, year: parseInt(year) };
    setLoading(true);
    setError(null); // Reset error state before submitting

    // Check if token is available
    if (!token) {
      setError('Authorization token not found.');
      setLoading(false);
      return;
    }

    axios.put(`http://localhost:3001/books/${params.id}`, book, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        setError('Failed to update the book. Please try again later.');
      });
  };

  useEffect(() => {

    const token = localStorage.getItem("Token");
    if(!token){
      setLoading(false);
      navigate("/users/login");
    }

    setLoading(true);
    axios.get(`http://localhost:3001/books/${params.id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setYear(response.data.year);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError('Failed to fetch the book details.');
      });
  }, [params.id]);

  return (
    <section className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center px-6 py-5 bg-blue-600 text-white shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">Edit a Book</h1>
      </header>
      <div className="content px-6 py-8 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 space-y-4"
        >
          {/* Display error message if exists */}
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow-md">
              <strong>Error: </strong>{error}
            </div>
          )}
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
            className={`w-full py-2 px-4 text-white font-medium rounded-lg transition-all ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
              }`}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Submit'}
          </button>
        </form>
      </div>
      <div className='grid place-content-center'>
        <HomeButton />
      </div>
    </section>
  );
}

export default EditBook;
