import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button'
import InfoComponent from "../components/InfoComponent"

function EditBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    const book = { title, author, year: parseInt(year) };
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('Token');
    if (!token) {
      navigate('/users/login');
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
        setError(err.response.data.message);
      });
  };

  useEffect(() => {

    const token = localStorage.getItem("Token");
    if (!token) {
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
        setError(err.response.data.message);
      });
  }, []);

  return (
    <section className="min-h-screen bg-gray-50">

      <Navbar headingText={"Add book"} buttonElementArray={[<Button buttonContent={"Home"} handler={() => navigate("/")} key="home" />]} />

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

          <div className='flex justify-center'>
            {loading ? (
              <InfoComponent contentText={"Loading"} />
            ) : (
              <Button buttonContent={"Submit"} handler={() => 1} />
            )}
          </div>

        </form>
      </div>
    </section>
  );
}

export default EditBook;
