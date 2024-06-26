import React from 'react';
import { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosInstance';
import { useSearchContext } from '../Context/SearchContext';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import '../components/SearchAnimes.css';
import { IconButton } from '@mui/material';
import { PlaylistAdd, Check } from '@mui/icons-material';
import { useAuth0 } from "@auth0/auth0-react";
import { checkIfInWishList } from '../services/wishListService';
import { removeWishList } from '../services/wishListService';
import { addWishList } from '../services/wishListService';
import WatchEpisodesButton from './ui/WatchEpisodesButton';


function SearchAnimes() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(false);
  const { search } = useSearchContext();
  const navigate = useNavigate();
  const [watchListed, setWatchListed] = useState(false);
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (search) {
      fetchAnime();
    }
  }, [search]);

  const fetchAnime = async () => {
    try {
      setLoading(true);
      const result = await axiosInstance.get(`/anime?q=${search}`);
      if (isAuthenticated) {
        const results = await checkIfInWishList(isAuthenticated, user, result.data.data[0].mal_id);
        if (results) {
          setWatchListed(true);
        } else {
          setWatchListed(false);
        }
      }
      setAnime(result.data.data[0]);
    } catch (error) {
      console.error('Error fetching anime:nnnn', error); // Handle errors gracefully
    } finally {
      setLoading(false);
    }
  };

  const handleWatchListToggle = async () => {
    try {
      setLoading(true);
      if (isAuthenticated) {
        if (watchListed) {
          await removeWishList(isAuthenticated, user, anime.mal_id);
          setWatchListed(false);
        } else {
          const animeDetails = {
            malid: anime.mal_id,
            imageUrl: anime.images.jpg.large_image_url,
            title: anime.title
          }
          await addWishList(isAuthenticated, user, animeDetails);
          setWatchListed(true);
        }
      } else {
        loginWithRedirect();
      }
      setLoading(false);

    } catch (err) {
      alert(err)
    }
  };

  const handleGoToHome = () => {
    navigate('/')
  }

  return (
    <div className='bg-gradient-to-b from-black to-gray-900 min-h-screen flex justify-center'>
      <div className="pt-32 top-anime-container ">
        <h1 className="font-bold text-2xl mb-4 text-gray-200 pl-5">{anime.title}</h1>

        <div className="flex flex-no-wrap overflow-x-auto custom-scrollbar">
          {loading ? (
            <Loading />
          ) : anime && anime.images ? (
            <div>
              <div className="w-auto h-auto p-2 relative">
                <div className="anime-image-wrapper">
                  <img
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    className="w-96 h-80 object-cover rounded-lg cursor-pointer hover:scale-110"
                  />
                </div>
               <WatchEpisodesButton/>

              </div>
              <div className='mt-3 flex justify-between ml-4 mr-4'>
                <div>
                  <h1 className='sm:text-lg lg:text-xl text-white font-bold'>Duration</h1>
                  <p className='text-gray-200 text-opacity-55'>{anime.duration}</p>
                </div>
                <div>
                  <h1 className='sm:text-lg lg:text-xl text-white font-bold '>Rating</h1>
                  <p className='text-gray-200 text-opacity-55'>{anime.score}</p>
                </div>
                <div>
                  <h1 className='sm:text-lg lg:text-xl text-white font-bold '>Rank</h1>
                  <p className='text-gray-200 text-opacity-55'>{anime.rank}</p>
                </div>


              </div>
              <div className='text-center mt-5'>
                <IconButton color="primary" aria-label="add to watchlist" onClick={handleWatchListToggle}>
                  {watchListed ? <Check /> : <PlaylistAdd />}
                </IconButton>
                <span className="text-white">{watchListed ? "Added to Watchlist" : "Add to Watchlist"}</span>

              </div>
            </div>
          ) : (
            <div className="not-found-modal">
              <div className="not-found-content flex flex-col ">

                <h1 className="font-bold text-2xl mb-4 text-gray-200 pl-5 text-center w-full">Unable to find an Anime</h1>
                <div className='flex items-center'>
                  <button onClick={handleGoToHome} className="  hover:bg-gray-500 font-bold h-10  w-full  text-white bg-opacity-25 border border-white rounded-lg ">
                    Go to Home
                  </button>
                </div>


              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchAnimes;
