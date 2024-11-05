import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './Component/HomePage';
import SignupForm from './Component/SignupForm';
import LoginForm from './Component/LoginForm';
import Auth from './Component/Auth'; 
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './Redux/Auth/Action';

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((store) => store.auth);

  useEffect(() => {
    if (auth.jwt || jwt) {
      dispatch(getUser(auth.jwt || jwt));
    }
  }, [auth.jwt, dispatch, jwt]); 

  console.log(auth);

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirecting to home if user is authenticated */}
        {auth.jwt ? (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/home" />} /> {/* Redirect all other routes to home */}
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect root to login */}
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
