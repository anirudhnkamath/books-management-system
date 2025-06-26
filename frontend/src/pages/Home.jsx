import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaInfoCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx'
import Navbar from '../components/Navbar.jsx'
import InfoComponent from '../components/InfoComponent.jsx'

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [navbarButtons, setNavbarButtons] = useState([]);

  const navigate = useNavigate();

  const loggedInButtons = [ 
    <Button 
      key="addbook"
      buttonContent={"Add Book"} 
      handler={() => navigate("/books/create")} 
    /> ,
    <Button 
      key="logout"
      buttonContent={"Logout"} 
      handler={handleLogout}
    />
  ]
  const loggedOutButtons = [
    <Button 
      key="login"
      buttonContent={"Login"} 
      handler={() => navigate("/users/login")} 
    /> ,
    <Button 
      key="register"
      buttonContent={"Register"} 
      handler={() => navigate("/users/register")} 
    />
  ]

  useEffect(() => {
    if(localStorage.getItem("Token")) {
      handleLogin();
    }
    else {
      handleLogout();
    }

    setLoading(true);
    axios
      .get('http://localhost:3001/books/')
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });

  }, []);

  function handleLogout(e) {
    setLoggedIn(false);
    setNavbarButtons(loggedOutButtons);
    localStorage.removeItem("Token");
  }
  function handleLogin(e) {
    setLoggedIn(true);
    setNavbarButtons(loggedInButtons);
  }

  return (
    <section className="min-h-screen bg-gray-50">

      {/* <header className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">List of Books</h1>
        <div className='buttons flex gap-4'>
          {
            loggedIn &&
            <Link to="/books/create">
              <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-transform transform hover:scale-105">
                Add Book
              </button>
            </Link>
          }
          {
            !loggedIn &&
            <Link to="/users/login">
              <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-transform transform hover:scale-105">
                Login
              </button>
            </Link>
          }
          {
            !loggedIn &&
            <Link to="/users/register">
              <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-transform transform hover:scale-105">
                Register
              </button>
            </Link>
          }
          {
            loggedIn &&
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
              onClick={handleLogout}
            >
              Logout
            </button>
          }
        </div>

      </header> */}

      <Navbar headingText={"List of Books"} buttonElementArray={navbarButtons} />

      <main className="content px-6 py-8">
        {loading ? (
          <InfoComponent contentText={"Loading"} />

        ) : books.length > 0 ? (

          <div className="overflow-x-auto">
            <table className="table-auto w-full max-w-[1000px] mx-auto border border-gray-300 shadow-lg rounded-lg">

              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Serial No.</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Title</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Author</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Year</th>
                  <th className="border border-gray-300 px-4 py-2 text-center font-semibold">Options</th>
                </tr>
              </thead>

              <tbody>
                {books.map((book, index) => (

                  <tr key={book._id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-all`}>
                    <td className="border border-gray-300 px-4 py-2 text-gray-800">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-800">{book.title}</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-800">{book.author}</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-800">{book.year}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <div className="flex items-center justify-center gap-4">
                        <Link to={`/books/details/${book._id}`} className="p-2 hover:bg-gray-200 rounded-lg">
                          <FaInfoCircle className="text-blue-500 hover:text-blue-700 h-5 w-5 transition-colors" />
                        </Link>
                        {
                          loggedIn &&
                          <Link to={`/books/edit/${book._id}`} className="p-2 hover:bg-gray-200 rounded-lg">
                            <FaEdit className="text-green-500 hover:text-green-700 h-5 w-5 transition-colors" />
                          </Link>
                        }
                        {
                          loggedIn && <Link to={`/books/delete/${book._id}`} className="p-2 hover:bg-gray-200 rounded-lg">
                            <FaTrashAlt className="text-red-500 hover:text-red-700 h-5 w-5 transition-colors" />
                          </Link>
                        }
                      </div>
                    </td>
                  </tr>
                  
                ))}
              </tbody>

            </table>
          </div>
        
        ) : (
          <InfoComponent contentText={"No books available"} />
        )}

      </main>
      
    </section>
  );
}

export default Home;
