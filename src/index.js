import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { SearchProvider } from './Context/SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <SearchProvider>
  <Navbar/>
   <App />
   <Footer/>
   </SearchProvider>
  </BrowserRouter>
 
);



