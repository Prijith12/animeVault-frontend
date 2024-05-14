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
    domain="dev-ioi1yz3n1f0dfxyb.us.auth0.com"
    clientId="YudRMZd71LycIyqiOJNQ631CdDwYfZeV"
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



