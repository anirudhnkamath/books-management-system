import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import { useNavigate } from 'react-router-dom';

function DeleteBook() {

  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("Token");
    if(!token) {
      setLoading(false);
      navigate("/users/login");
    }

    axios.delete(`http://localhost:3001/books/${params.id}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [])

  return (
    <section className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center px-6 py-5 bg-blue-600 text-white shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">Delete a Book</h1>
      </header>
      <div className="text-xl font-medium text-center text-gray-600 my-8">
        Book was successfully deleted
      </div>
      <div className='grid place-content-center'>
        <HomeButton />
      </div>
    </section>
  )
}

export default DeleteBook