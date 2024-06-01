import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { SearchProvider } from './Context/SearchContext';
import BottomNavbar from './components/BottomNavbar';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  <BrowserRouter>
  <SearchProvider>
  <Navbar/>
   <App />
   <BottomNavbar/>
   <Footer/>
   </SearchProvider>
  </BrowserRouter>
  </Auth0Provider>
 
);



