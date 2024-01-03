import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import App from './App';
// import Navbar from './utility/Navbar';
import Transaction from './components/Transaction';
import Login from './components/Login';
import TransactionHistory from './components/TransactionHistory'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login/>} />
      </Routes>
      <Routes>
        <Route exact path="/dashboard" element={<TransactionHistory/>} />
      </Routes>
      <Routes>
        <Route exact path="/transactions" element={<App/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);