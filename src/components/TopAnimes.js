import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/axiosInstance';
import Loading from './Loading';
import '../components/TopAnimes.css'
import { useNavigate } from 'react-router-dom';
import { useSearchContext } from '../Context/SearchContext';

function TopAnimes() {
  const [topAnime, setTopAnime] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const {updateSearch}=useSearchContext();

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get('/top/anime');
        setTopAnime(response.data.data);
        
      } catch (error) {
        setLoading(true)
        console.error('Error fetching top anime:', error);
        setLoading(false);
      }finally{
        setLoading(false);
      }
    };

    fetchTopAnime();
  }, []);

  const handleFetchAnime=(data)=>{
    updateSearch(data);
    navigate('/fetchAnimes');
  }

  return (
    <div className="mt-20 top-anime-container " id='topAnimes'>
      <h1 className="font-semibold text-lg mb-4 text-gray-200 pl-5">Top Anime</h1>
      <div className="flex flex-no-wrap overflow-x-auto custom-scrollbar">
        {loading ? (
          <Loading />
        ) : (
          topAnime.map((anime) => (
            <div key={anime.mal_id} className="w-64 p-2 " onClick={()=>{
              handleFetchAnime(anime.mal_id)
            }}>
              <div className="bg-gray-800 rounded-md overflow-hidden shadow-md">
                <img
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  className="w-64 h-48 object-cover cursor-pointer hover:scale-110"
                />
                <div className="p-2 w-40">
                  <p className="text-gray-400 text-sm">{anime.score}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TopAnimes;
