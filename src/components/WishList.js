import React, { useState, useEffect } from 'react';
import '../components/TopAnimes.css';
import axios from 'axios';
import Loading from './Loading';
import { useAuth0 } from '@auth0/auth0-react';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RemoveCircle } from '@mui/icons-material';
import { removeWishList } from '../services/wishListService';

function WishList() {
  const [animes, setAnime] = useState([]);
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0(); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [refreshWishlist, setRefreshWishlist] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchWishList = async () => {
      try {
        setLoading(true);
        const result = await axios.post(`${process.env.REACT_APP_API_URL}/viewWishList`, {
          isAuthenticated,
          user
        });
        if (result && result.data) {
          setAnime(result.data);
          console.log(result.data);
        }
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishList();
  }, [isAuthenticated, user,refreshWishlist]);

  const  handleRemoveFromWishList=async(malid)=>{
    try{
      setLoading(true);
      await removeWishList(isAuthenticated,user,malid)
    }catch(err){
      alert(err)
    }finally{
      setLoading(false)
      setRefreshWishlist(!refreshWishlist);
    }

  }

  const handleGoToHome = () => {
    navigate('/')
  }

  return (
    <div className='bg-gradient-to-b from-black to-gray-900 min-h-screen '>
      <h1 className='text-white pt-8 font-bold sm:text-base lg:text-lg text-center '>WishList</h1>
      <div className=" flex-no-wrap overflow-x-auto custom-scrollbar flex justify-center items-center mt-10">
        {loading ? (
          <Loading />
        ) : (
          animes.length > 0 ? (
            animes.map((anime) => (
              <div key={anime.malid} className="w-64 p-2">
                <div className=" rounded-md overflow-hidden shadow-md">
             
                    <h3 className="text-white">{anime.title}</h3>
               
                  <img
                    src={anime.imageUrl}
                    alt={anime.title}
                    className="w-64 h-48 object-cover cursor-pointer hover:scale-110"
                  />
                  <div>
                 <button className="bg-gray-800 hover:bg-opacity-90  bottom-0 h-10 w-full text-center text-white bg-opacity-25 border border-black rounded-lg focus:outline-none">
                    Watch Episodes
                  </button>
                  
                  <div className=" mt-4 absolute flex items-center"  onClick={() => handleRemoveFromWishList(anime.malid)}>
                    <IconButton
                      color="secondary"
                      aria-label="remove from wishlist"
                     
                    >
                      <RemoveCircle />
                    </IconButton>
                    <span className="text-white ml-1">Remove</span>
                  </div>
                  
                  </div>
                 
                </div>
              </div>
            ))
          ) : (
            <div className="not-found-modal">
            <div className="not-found-content flex flex-col ">

              <h1 className="font-bold text-2xl mb-4 text-gray-200 pl-5 text-center w-full">WhishList is empty</h1>
              <div className='flex items-center'>
                <button onClick={handleGoToHome} className="  hover:bg-gray-500 font-bold h-10  w-full  text-white bg-opacity-25 border border-white rounded-lg ">
                  Go to Home
                </button>
              </div>


            </div>
          </div>
          )
        )}
      </div>
    </div>
  );
}

export default WishList;
