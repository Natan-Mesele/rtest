// src/components/SignupForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../Redux/Auth/Action';
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ handleSwitch }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { 
      fullname: fullname.trim(), 
      email: email.trim(), 
      password: password.trim(), 
      role: role.toUpperCase() 
    };
    
    console.log("User Data to Register:", userData);
    dispatch(register({ userData }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600">Full Name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md"
            />
          </div>
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
          <div>
            <label className="block text-gray-600">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account? 
          <button onClick={() => navigate('/login')} className="text-blue-500"> Login</button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
