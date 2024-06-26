import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import { Crown } from 'lucide-react';
import { LoadingSm } from './components/Loading';
import { useSearchContext } from './Context/SearchContext';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import './Navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [shortName, setShortName] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchAnime, setSearchAnime] = useState('');
  const { updateSearch, updateIsPremium, isPremium } = useSearchContext();
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  useEffect(() => {
    fetchUserData();
  }, [isAuthenticated, user, isPremium]);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      if (isAuthenticated) {
        const result = await axios.post(`${process.env.REACT_APP_API_URL}/login`, ({
          isAuthenticated, user
        }));
        if (result.data.success) {
          setUserName(user.name);
          setShortName(generateShortName(user.name));
          if(result.data.premium){
            updateIsPremium(true)
          }else{
            updateIsPremium(false)
          }
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setUserName(null);
          setShortName(null);
        }
      }
    } catch (err) {
      alert("Server is Down");
    } finally {
      setIsLoading(false);
    }
  };

  const generateShortName = (name) => {
    if (name) {
      return name.slice(0, 2).toUpperCase();
    }
    return '';
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchAnime.trim()) {
      updateSearch(searchAnime);
      navigate('/searchAnime');
      setSearchAnime('');
    }
  };

  const logIn = async () => {
    try {
      setIsLoading(true);
      await loginWithRedirect();
    } catch (err) {
      console.error("Login error: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  const wishList = () => {
    if (isAuthenticated) {
      navigate('/wishList');
    } else {
      loginWithRedirect();
    }
  };

  return (
    <div className='navbar bg-gradient-to-b from-black to-black flex-wrap flex items-center justify-between p-4 sticky top-0 z-50'>
      <h1 className="text-2xl lg:text-3xl xl:text-4xl font-extrabold text-white uppercase tracking-wider text-center mb-4 lg:mb-0">
        <Link to="/">
          <span className="text-purple-500">ANIME</span>
          <span className="text-yellow-500">VAULT</span>
        </Link>
        
      </h1>

      <div className='flex items-center justify-between w-full md:w-auto'>
        <div className='hidden md:flex '>
          <h1 className='text-gray-400 text-right pr-8 font-bold hover:text-gray-500 text'><Link to='/'>Home</Link></h1>
          <h1 className='text-gray-400 text-right pr-8 font-bold hover:text-gray-500 text' onClick={wishList}>WishList</h1>
          {isAuthenticated && !isPremium ? (
            <div className="border border-yellow-500 rounded-lg overflow-hidden mr-6">
              <button className="block text-yellow-500 px-2 py-1 w-full text-center text-xs bg-black hover:bg-gray-900" onClick={() => navigate('/premium')}>
                Premium
              </button>
            </div>
          ) : null}
        </div>
        <div className="relative flex pl-2">
          <SearchIcon className="absolute text-white pt-2" />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="pl-10 pr-3 py-1 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none w-40"
              onChange={(e) => setSearchAnime(e.target.value)}
              placeholder="Search"
              value={searchAnime}
            />
          </form>
          
        </div>

        {isLoading ? (
          <div className="text-sm text-green-100 ml-2 py-2 ">
            <button className="bg-purple-500 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-full"><LoadingSm /></button>
          </div>
        ) : isLoggedIn ? (
          <div className="flex items-center pl-9   flex-col ">
            
              {isPremium && (
                <div className="flex items-center text-yellow-500 mb-1">
                  <Crown className='text-yellow-600 ' size={13}/> <span className='text-yellow-500 text-xs'>Premium</span>
                </div>
              )}

            <button className="text-sm text-green-100 ml-2 bg-gray-900 hover:bg-gray-700 px-4 py-2 rounded-full " onClick={handleMenuOpen}>
            
                 <AccountCircleIcon fontSize='small' />
              <span className='mt-1'>{shortName}</span>

            </button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem disabled>
                <span>{userName}</span>
              </MenuItem>
              <MenuItem>
                <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                  Log Out
                </button>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div className="text-sm text-green-100 ml-2 py-2 px-4">
            <button onClick={logIn} className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-full">SignIn</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
