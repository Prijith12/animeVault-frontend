import './App.css';
import { Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import SearchAnimes from './components/SearchAnimes';
import FetchAnimes from './components/FetchAnimes';
import FetchCharacter from './components/FetchCharacter';
import TopAnimes from './components/TopAnimes';

function App() {
  return (

    <Routes>
      <Route path='/' element={<Home/>}>
      </Route>
      <Route path='/searchAnime' element={<SearchAnimes/>}></Route>
      <Route path='/fetchAnimes' element={<FetchAnimes/>}></Route>
      <Route path='/fetchCharacter' element={<FetchCharacter/>}></Route>
    </Routes> 

  )
}

export default App;
