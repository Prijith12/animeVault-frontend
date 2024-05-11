import React, { useEffect, useState } from 'react';
import '../pages/Home.css';
import Loading from '../components/Loading';
import TopAnimes from '../components/TopAnimes'; 
import TopCharacters from '../components/TopCharacters';
import Topmangas from '../components/Topmangas';
import {useNavigate } from 'react-router-dom';
import { useSearchContext } from '../Context/SearchContext';
function Home() {
  const [topAnime, setTopAnime] = useState(null);
  const {updateSearch}=useSearchContext()
  const navigate=useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchRandomBanner = () => {
      const randomNum = Math.floor(Math.random() * 5) + 1; // Ensure randomNum is between 1 and 5
      const bannerImage = `/onepiece${randomNum}.jpg`;
      setTopAnime(bannerImage);
    };

    fetchRandomBanner();

    const intervalId = setInterval(fetchRandomBanner, 5000);
    return () => clearInterval(intervalId);
  }, []); 

  const onePieceSubmit=()=>{
    updateSearch(459);
    navigate('/fetchAnimes')
  }

  return (
    <div className='bg-gradient-to-b from-black to-gray-900 min-h-screen'>
      <div className="banner-image-container relative w-full h-96 overflow-hidden ">
       <div className="overlay absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-transparent"></div>
        {topAnime ? (
          <img
            src={topAnime}
            alt='img'
            className='bannerImage  '
          />
        ) : (
          <Loading />
        )}
        <div className="overlay absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
        <button className="play-button absolute bottom-8 left-8 py-2 px-4 bg-red-600 text-white font-bold rounded " onClick={onePieceSubmit}>
          Play
        </button>
      </div>
      <TopAnimes/>
      <TopCharacters/>
      <Topmangas/>
    </div>
  );
}

export default Home;
