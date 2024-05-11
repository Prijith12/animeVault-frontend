
import React from 'react';
import { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosInstance';
import { useSearchContext } from '../Context/SearchContext';
import Loading from './Loading';
import '../components/SearchAnimes.css';
import { useNavigate } from 'react-router-dom';

function FetchCharacter() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(false);
  const { search } = useSearchContext();
  const navigate=useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0);
    if (search) {
      fetchAnime();
    }
  }, [search]);

  const fetchAnime = async () => {
    try {
      setLoading(true);
      const result = await axiosInstance.get(`/anime/${search}/characters`);
      console.log(result.data.data[0]);
      setAnime(result.data.data[0].character)
    } catch (error) {
      console.error('Error fetching anime:', error); // Handle errors gracefully
    } finally {
      setLoading(false);
    }
  };

  const handleGoToHome=()=>{
    navigate('/')
  }
  return (
    <div className='bg-gradient-to-b from-black to-gray-900 min-h-screen flex justify-center'>
      <div className="pt-32 top-anime-container ">
        <h1 className="font-bold text-2xl mb-4 text-gray-200 pl-5">{anime.name}</h1>

        <div className="flex flex-no-wrap overflow-x-auto custom-scrollbar">
          {loading ? (
            <Loading />
          ) : anime && anime.images ? (
            <div>
            <div className="w-auto h-auto p-2 relative">
              <div className="anime-image-wrapper">
                <img
                  src={anime.images.jpg.image_url}
                  alt=".."
                  className="w-96 h-80 object-cover rounded-lg cursor-pointer hover:scale-110"
                />
              </div>
              <button className="subscribe-button absolute bottom-0 left-0 w-96  text-center text-white bg-opacity-25 border border-white rounded-lg focus:outline-none">
                Watch Episodes
              </button>
              
            </div>
            <div className='mt-3 text-center'>
                

              </div>
            </div>
          ) : (
            <div className="not-found-modal">
            <div className="not-found-content flex flex-col ">
            
              <h1 className="font-bold text-2xl mb-4 text-gray-200 pl-5 text-center w-full">Unable to find a Character</h1>
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

export default FetchCharacter;
