import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import InfoComponent from '../components/InfoComponent';

function DeleteBook() {

  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if(!token){
      navigate("/users/login");
    }
  },[])

  function handleDelete(){
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
        navigate("/");
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className="min-h-screen bg-gray-50">
      
      <Navbar headingText={"Add book"} buttonElementArray={[ <Button buttonContent={"Home"} handler={() => navigate("/")} key="home"/>]} />

      <section className='flex flex-col justify-center gap-4'>
        <InfoComponent contentText={"Are you sure you want to delete this book?"}/>

        { loading ? (
          <InfoComponent contentText={"Loading"} />
        ) : (
          <div className='flex justify-center gap-4'>
            <Button buttonContent={"Delete"} handler={handleDelete}/>
            <Button buttonContent={"Go to Home"} handler={() => navigate('/')}/>
          </div>
        )} 
        

      </section>
    
    </section>
  )
}

export default DeleteBook