// src/components/LoginForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Redux/Auth/Action';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ handleSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jwt, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (jwt) {
      navigate('/home'); // Redirect on successful login
    }
  }, [jwt, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(loginUser(userData));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <p className="text-sm text-center text-gray-600">
          Don't have an account? 
          <button onClick={() => navigate('/signup')} className="text-blue-500"> Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
