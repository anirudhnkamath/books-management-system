import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InfoComponent from '../components/InfoComponent';
import Navbar from '../components/Navbar'
import Button from '../components/Button';

function ShowBook() {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const navigate = useNavigate();

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
      
      <Navbar headingText={"Add book"} buttonElementArray={[ <Button buttonContent={"Home"} handler={() => navigate("/")} key="home"/>]} />

      <div className="content px-6 py-8 flex justify-center ">
        {loading ? (
          <InfoComponent contentText={"Loading"} />
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
    </section>
  );
}

export default ShowBook;
