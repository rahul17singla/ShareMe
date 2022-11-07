import React, { useEffect } from 'react'
import jwt_decode from 'jwt-decode';
// import { Routes, Route, useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './container/Home';
import { getUserDataFromToken } from './utils';



const App = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = getUserDataFromToken();
    if (!userInfo) {
      localStorage.clear();
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  )
}

export default App