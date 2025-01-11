import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../components/HomeButton';

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
        setError("Invalid Credentials");
      });
  };

  return (
    <section className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center px-6 py-5 bg-blue-600 text-white shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">Login</h1>
      </header>
      <div className="content px-6 py-8 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 space-y-4"
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
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-medium rounded-lg transition-all ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
              }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
      {error && (
        <div className="bg-red-200 text-red-800 border-l-4 border-red-500 p-4 mx-12 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className='grid place-content-center mt-4'>
        <HomeButton />
      </div>

    </section>
  );
}

export default Login;
