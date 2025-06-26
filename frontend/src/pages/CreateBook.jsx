import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button'
import InfoComponent from "../components/InfoComponent"

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
        setLoading(false);
        navigate("/");
      });
  };

  return (
    <section className="min-h-screen bg-gray-50">

      <Navbar headingText={"Add book"} buttonElementArray={[ <Button buttonContent={"Home"} handler={() => navigate("/")} key="home"/>]} />
        
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
            { loading ? (
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

export default CreateBook;
