import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Loading from './components/Loading';
import axiosInstance from './config/axiosInstance';
import { useSearchContext } from './Context/SearchContext';


function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Prijith");
  const [anchorEl, setAnchorEl] = useState(null);
const [searchAnime,setSearchAnime]=useState(null);
const {updateSearch}=useSearchContext();
let navigate=useNavigate()




  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement your logout logic here
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    updateSearch(searchAnime);
    navigate('/searchAnime');
    setSearchAnime('')
    
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
      <div className='hidden md:flex'>
    <h1 className='text-gray-400 text-right pr-8 font-bold hover:text-gray-500 '> <Link to='/'>Home</Link></h1>
    <h1 className='text-gray-400 text-right pr-8 font-bold hover:text-gray-500'> <Link to='/'>WishList</Link></h1>
    </div>
      <div className="relative flex">
        <SearchIcon className="absolute text-white pt-2" />
        <form onSubmit={(e)=>{
          handleSubmit(e)
        }}>
        <input
          type="text"
          className="pl-10 pr-3 py-1 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none w-40"
          onChange={(e)=>{
            setSearchAnime(e.target.value)
          }}
          placeholder="Search"
          value={searchAnime}
        />
        </form>
      </div>
      {isLoggedIn ? (
        <div className="flex items-center">
          <button className="text-sm text-green-100 ml-2 bg-purple-500 hover:bg-purple-700 px-4 py-2 rounded-full" onClick={handleMenuOpen}>
            <div className="text-gray-200 text-sm mr-4"><AccountCircleIcon /> {userName}</div>
          </button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      ) : (
        <Link to="/signIn" className="text-sm text-green-100 ml-2 py-2 px-4">
          <button className="bg-purple-500 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-full">SignIn</button>
        </Link>
      )}
    </div>
  </div>
  
    
  )
}

export default Navbar;
