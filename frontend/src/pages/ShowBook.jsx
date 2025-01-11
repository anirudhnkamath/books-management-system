import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import HomeButton from "../components/HomeButton"

function ShowBook() {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/books/${params.id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center px-6 py-5 bg-blue-600 text-white shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">Book Details</h1>
      </header>
      <div className="content px-6 py-8 flex justify-center ">
        {loading ? (
          <Loading />
        ) : (
          <div className="bg-white shadow-lg w-full max-w-md p-6">
            <h1 className="text-3xl font-bold text-black-600 mb-4">{book.title}</h1>
            <div className="text-gray-700 mb-2">
              <span className="font-medium mr-2">Book ID:</span> {book._id}
            </div>
            <div className="text-gray-700 mb-2">
              <span className="font-medium mr-2">Author:</span> {book.author}
            </div>
            <div className="text-gray-700 mb-2">
              <span className="font-medium mr-2">Created At:</span>{' '}
              {new Date(book.createdAt).toLocaleString()}
            </div>
            <div className="text-gray-700 mb-2">
              <span className="font-medium mr-2">Updated At:</span>{' '}
              {new Date(book.updatedAt).toLocaleString()}
            </div>
          </div>
        )}
      </div>

      <div className='grid place-content-center'>
        <HomeButton/>
      </div>

    </section>
  );
}

export default ShowBook;
