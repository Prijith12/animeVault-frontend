import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { useSearchContext } from '../../Context/SearchContext';
function WatchEpisodesButton() {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const { isPremium } = useSearchContext();
    const navigate=useNavigate()
    const handleWatchEpisodes=()=>{
        if(!isAuthenticated){
            loginWithRedirect()
        }else if(isPremium){
            navigate('/watchEpisodes')
           
        }else{
            navigate('/premium')
        }
        
    }
    return (
        <button className="subscribe-button absolute bottom-0 left-0 w-96  text-center text-white bg-opacity-25 border border-white rounded-lg focus:outline-none" onClick={handleWatchEpisodes}>
            Watch Episodes
        </button>
    )
}

export default WatchEpisodesButton
