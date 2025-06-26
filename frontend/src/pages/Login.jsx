import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import Error from '../components/Error'
import InfoComponent from '../components/InfoComponent'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    await axios.post('http://localhost:3001/users/login', { username, password })
      .then(data => {
        setLoading(false);
        localStorage.setItem("Token", data.data.token);
        navigate("/");
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setError(err.response.data.message);
      });
  };

  return (
    <section className="min-h-screen bg-gray-50">
      
      <Navbar headingText={"Login"} buttonElementArray={[ <Button buttonContent={"Home"} handler={() => navigate("/")} key="home" />]}/>
    
      <div className="content px-6 py-8 flex flex-col justify-center items-center gap-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 space-y-4 justify-center"
        >
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
    
        {error && (
          <Error contentText={error} />
        )}

      </div>

    </section>
  );
}

export default Login;
