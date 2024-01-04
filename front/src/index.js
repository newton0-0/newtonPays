import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import App from './App';
// import Navbar from './utility/Navbar';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
const checkUser = localStorage.getItem('username');

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={checkUser? <Dashboard/> :<Login/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);