// src/App.js
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const App = () => {
  const [isLogin, setIsLogin] = useState(true); // Initial state is set to true for Login

  const toggleForm = () => {
    console.log("Toggling form"); // Log toggle action
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div>
    {isLogin ? (
      <LoginForm handleSwitch={toggleForm} />
    ) : (
      <SignupForm handleSwitch={toggleForm} /> // Use the same prop name here
    )}
  </div>
  );
};

export default App;
